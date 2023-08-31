import {
  vibrate,
  VibrateClass,
} from './../../../shared/animations/vibrate.animation';
import { ModalService } from './../../../core/services/modal.service';
import { InputFeedbackComponent } from './../../../shared/input-feedback/input-feedback.component';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormsModule, NgForm } from '@angular/forms';

export const NEED_HELP_KEY = 'needHelp';

@Component({
  standalone: true,
  imports: [ModalComponent, FormsModule, InputFeedbackComponent],
  selector: 'app-need-help-modal',
  templateUrl: './need-help-modal.component.html',
  styleUrls: ['./need-help-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [vibrate],
})
export class NeedHelpModalComponent extends VibrateClass {
  @ViewChild('f') form: NgForm;
  email = '';
  comment = '';
  modalKey = NEED_HELP_KEY;

  constructor(private modalService: ModalService) {
    super();
  }

  onSubmit() {
    if (!this.form.form.valid) {
      this.form.form.markAllAsTouched();
      this.toggleVibrate();
      return;
    }

    console.log(this.form.form.value);
    this.form.form.reset();
    this.modalService.hide();
  }
}
