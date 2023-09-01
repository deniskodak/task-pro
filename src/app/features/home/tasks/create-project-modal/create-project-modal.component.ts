import { filter } from 'rxjs/operators';
import { SquareButtonComponent } from 'src/app/shared/squre-button/squre-button.component';
import { TrimDirective } from './../../../../shared/directives/trim.directive';
import {
  VibrateClass,
  vibrate,
} from './../../../../shared/animations/vibrate.animation';
import { InputFeedbackComponent } from 'src/app/shared/input-feedback/input-feedback.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { tasksActions } from 'src/app/core/store/tasks/tasks.actions';
import { Project } from 'src/app/core/models/project.model';
import { v4 } from 'uuid';

export const CREATE_PROJECT_KEY = 'createProject';

@Component({
  standalone: true,
  selector: 'app-create-project-modal',
  imports: [
    ModalComponent,
    FormsModule,
    InputFeedbackComponent,
    TrimDirective,
    SquareButtonComponent,
  ],
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [vibrate],
})
export class CreateProjectModalComponent
  extends VibrateClass
  implements OnInit, OnDestroy
{
  @ViewChild('form') form: NgForm;
  title = '';
  column: Project = null;
  modalKey = CREATE_PROJECT_KEY;
  isEdit = false;
  destroy$ = new Subject<void>();
  constructor(
    private modalService: ModalService,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.modalService.modalOptions$
      .pipe(
        takeUntil(this.destroy$),
        filter(this.modalService.filterOptions(CREATE_PROJECT_KEY)),
        distinctUntilChanged()
      )
      .subscribe((options: { key: string; project?: Project }) => {
        const project = options?.project || null;
        this.form.form.reset();
        this.column = project;
        this.isEdit = !!project;
        this.title = project?.title || '';
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (!this.form.form.valid) {
      this.form.form.markAllAsTouched();
      this.toggleVibrate();
    }

    const { title } = this.form.value;
    const action = this.isEdit
      ? tasksActions.editProject({ title, id: this.column.id })
      : tasksActions.addProject({ project: new Project(title, v4()) });
    this.store.dispatch(action);
    this.modalService.hide();
  }
}
