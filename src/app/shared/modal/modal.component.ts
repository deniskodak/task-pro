import { NgIf, AsyncPipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { smoothAppear } from '../animations/smoth-appear.animation';

@Component({
  standalone: true,
  imports: [MatIconModule, NgIf, AsyncPipe, NgClass],
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [smoothAppear],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() title = '';
  @Input() isLarge = false;
  @Input() isShown = true;

  constructor(private modalService: ModalService) {}

  onHide() {
    this.modalService.hide();
  }
}
