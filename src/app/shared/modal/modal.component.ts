import { NgIf, AsyncPipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title = '';
  @Input() modalKey = '';
  @Input() isLarge = false;
  isShown = false;
  isShownSub: Subscription;
  
  constructor(
    private modalService: ModalService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isShownSub = this.modalService.modalOptions$.subscribe((options) => {
      this.isShown = options?.key === this.modalKey;
      this.changeDetectionRef.detectChanges();
    });
  }

  onHide() {
    this.modalService.hide();
  }

  ngOnDestroy() {
    this.isShownSub.unsubscribe();
  }
}
