import { NgFor } from '@angular/common';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  vibrate,
  VibrateClass,
} from 'src/app/shared/animations/vibrate.animation';
import { InputFeedbackComponent } from 'src/app/shared/input-feedback/input-feedback.component';
import { SquareButtonComponent } from 'src/app/shared/squre-button/squre-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomDatePipe } from 'src/app/shared/pipes/custom-date.pipe';
import {
  RadioComponent,
  Themes,
} from 'src/app/shared/radio-group/radio.component';
export const CREATE_TASK_KEY = 'createTask';

enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Without = 'without',
}

const THEMES_PRIORITY_MAP = {
  [TaskPriority.High]: Themes.Green,
  [TaskPriority.Medium]: Themes.Pink,
  [TaskPriority.Low]: Themes.Blue,
  [TaskPriority.Without]: Themes.Gray,
};

const priorityList = Object.values(TaskPriority);

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFeedbackComponent,
    ModalComponent,
    SquareButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    CustomDatePipe,
    MatRadioModule,
    RadioComponent,
    NgFor,
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
  priorityList = priorityList;

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

  getRadioTheme(priority: TaskPriority) {
    return THEMES_PRIORITY_MAP[priority];
  }
}
