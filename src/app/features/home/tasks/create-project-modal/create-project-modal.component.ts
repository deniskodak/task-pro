import { TrimDirective } from './../../../../shared/directives/trim.directive';
import {
  VibrateClass,
  vibrate,
} from './../../../../shared/animations/vibrate.animation';
import { InputFeedbackComponent } from 'src/app/shared/input-feedback/input-feedback.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { tasksActions } from 'src/app/core/store/tasks/tasks.actions';
import { Project } from 'src/app/core/models/project.model';

export const CREATE_PROJECT_KEY = 'createProject';

@Component({
  standalone: true,
  selector: 'app-create-project-modal',
  imports: [ModalComponent, FormsModule, InputFeedbackComponent, TrimDirective],
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss'],
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
  constructor(private modalService: ModalService, private store: Store) {
    super();
  }

  ngOnInit() {
    this.modalService.modalOptions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((options: { key: string; project?: Project }) => {
        const project = options?.project || null;
        this.column = project;
        this.isEdit = !!project;
        this.title = project?.title || '';
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
      ? tasksActions.editProject({ title, id: this.column. })
      : tasksActions.addProject({ project: new Project(title) });
    this.store.dispatch(action);
    this.modalService.hide();
  }
}
