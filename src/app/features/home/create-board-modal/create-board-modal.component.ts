import { InputFeedbackComponent } from './../../../shared/input-feedback/input-feedback.component';
import { SquareButtonComponent } from 'src/app/shared/squre-button/squre-button.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { tasksActions } from './../../../core/store/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { Board } from './../../../core/models/board.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import {
  boardIconList,
  BoardIcons,
} from './../../../core/services/icon.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { SvgIconComponent } from 'src/app/shared/svg-icon/svg-icon.component';
import { NgForOf, AsyncPipe, NgClass } from '@angular/common';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 } from 'uuid';
import { trimValidator } from 'src/app/shared/validators/trim.validator';

export const CREATE_BOARD_KEY = 'createBoard';

@Component({
  standalone: true,
  selector: 'app-create-board-modal',
  imports: [
    ModalComponent,
    SvgIconComponent,
    NgForOf,
    IconSpriteModule,
    MatIconModule,
    AsyncPipe,
    ReactiveFormsModule,
    SquareButtonComponent,
    InputFeedbackComponent,
    NgClass,
  ],
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBoardModalComponent implements OnInit, OnDestroy {
  board: Board = null;
  isEdit = false;
  iconsList: BoardIcons[] = boardIconList;
  selectedIcon: BoardIcons = BoardIcons.Project;
  destroy$ = new Subject<void>();
  form: FormGroup;
  previewImages$: Observable<
    {
      bucket: string;
      name: string;
      fullPath: string;
      getDownloadURL: () => Promise<string>;
    }[]
  >;

  constructor(
    private modalService: ModalService,
    private store: Store,
    private fs: AngularFireStorage,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();

    this.modalService.modalOptions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((options) => {
        this.board = options ? options['board'] : null;
        this.isEdit = Boolean(this.board);
        this.initForm();
        this.changeDetectorRef.detectChanges();
      });

    // this.previewImages$ = this.fs
    //   .ref('preview')
    //   .listAll()
    //   .pipe(
    //     map((list) =>
    //       list.items.filter((item) => {
    //         item.getDownloadURL().then((url) => console.log(url));
    //         return !item.name.includes('2x');
    //       })
    //     ),
    //     takeUntil(this.destroy$)
    //   );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    const { name = '', iconName = BoardIcons.Project, backgroundImg = '' } = this.board || {};
    this.selectedIcon = iconName;
    this.form = new FormGroup({
      title: new FormControl(name, [Validators.required, trimValidator]),
      backgroundImg: new FormControl(backgroundImg),
    });
  }

  onSubmit() {
    if (!this.form.valid) return;

    const { title, backgroundImg } = this.form.value;
    const boardId = this.board?.id || v4();
    const board = new Board(title.trim(), boardId, this.selectedIcon, backgroundImg);
    const action = this.isEdit
      ? tasksActions.editBoard({ board })
      : tasksActions.addBoard({ board });
    this.store.dispatch(action);
    this.modalService.hide();
  }

  onIconClick(icon: BoardIcons) {
    this.selectedIcon = icon;
  }

  isFieldValid(fieldName) {
    return !this.form.get(fieldName).valid && this.form.get(fieldName).touched;
  }
}
