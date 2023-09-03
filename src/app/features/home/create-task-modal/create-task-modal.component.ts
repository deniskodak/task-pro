import { tasksActions } from 'src/app/core/store/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { Task } from './../../../core/models/task.model';
import { NgFor } from '@angular/common';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { filter, Subscription } from 'rxjs';
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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { v4 } from 'uuid';

enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Without = 'without',
}

export const THEMES_PRIORITY_MAP = {
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
    CustomDatePipe,
    MatRadioModule,
    RadioComponent,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    CustomDatePipe,
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
  minDate = new Date();
  projectId: string;

  constructor(
    private modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();

    this.modalOptions = this.modalService.modalOptions$
      .pipe(filter(Boolean))
      .subscribe((options) => {
        this.projectId = options['projectId'];
        this.initForm();
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.modalOptions.unsubscribe();
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.toggleVibrate();
    }
    const { deadline, title, description, labelColor } = this.form.value;

    const formattedDate = new Date(deadline).toLocaleDateString('en-US');
    const task = new Task(title, description, v4(), labelColor, formattedDate);
    this.store.dispatch(tasksActions.addTask({task, projectId: this.projectId}));
    console.log(task);
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      labelColor: new FormControl('', Validators.required),
      deadline: new FormControl(new Date(), Validators.required),
    });
  }

  getRadioTheme(priority: TaskPriority) {
    return THEMES_PRIORITY_MAP[priority];
  }
}
