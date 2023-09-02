import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Subscription, distinctUntilChanged, filter } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  vibrate,
  VibrateClass,
} from 'src/app/shared/animations/vibrate.animation';
import { InputFeedbackComponent } from 'src/app/shared/input-feedback/input-feedback.component';
import { SquareButtonComponent } from 'src/app/shared/squre-button/squre-button.component';

export const CREATE_TASK_KEY = 'createTask';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFeedbackComponent,
    ModalComponent,
    SquareButtonComponent,
  ],
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  animations: [vibrate],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskModalComponent
  extends VibrateClass
  implements OnInit, OnDestroy
{
  modalKey = CREATE_TASK_KEY;
  form: FormGroup;
  isEdit: boolean;
  modalOptions: Subscription;

  constructor(
    private modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();

    this.modalOptions = this.modalService.modalOptions$.subscribe((options) => {
      this.initForm();
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.modalOptions.unsubscribe();
  }

  onSubmit() {}

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }
}
