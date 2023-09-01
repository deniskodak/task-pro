import { filter } from 'rxjs/operators';
import { Subscription, distinctUntilChanged } from 'rxjs';
import {
  vibrate,
  VibrateClass,
} from './../../../shared/animations/vibrate.animation';
import { ModalService } from './../../../core/services/modal.service';
import { InputFeedbackComponent } from './../../../shared/input-feedback/input-feedback.component';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
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
export class NeedHelpModalComponent extends VibrateClass implements OnInit {
  @ViewChild('f') form: NgForm;
  email = '';
  comment = '';
  modalKey = NEED_HELP_KEY;
  modalOptionsSub: Subscription;

  constructor(private modalService: ModalService, private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.modalOptionsSub = this.modalService.modalOptions$
      .pipe(
        filter(
          this.modalService.filterOptions(NEED_HELP_KEY),
          distinctUntilChanged()
        )
      )
      .subscribe(() => {
        this.form.form.reset();
        this.changeDetectorRef.detectChanges()
      });
  }

  onSubmit() {
    if (!this.form.form.valid) {
      this.form.form.markAllAsTouched();
      this.toggleVibrate();
      return;
    }

    this.form.form.reset();
    this.modalService.hide();
  }
}
