import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { NEED_HELP_KEY } from 'src/app/features/home/need-help-modal/need-help-modal.component';

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-faq-info',
  templateUrl: './faq-info.component.html',
  styleUrls: ['./faq-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqInfoComponent {
  constructor(private modalService: ModalService) {}

  onNeedHelpClick() {
    this.modalService.setModalOptions({ key: NEED_HELP_KEY });
  }
}
