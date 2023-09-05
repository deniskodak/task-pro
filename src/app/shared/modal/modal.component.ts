import { LoaderComponent } from './../loader/loader.component';
import { NgIf, AsyncPipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { smoothAppear } from '../animations/smoth-appear.animation';

@Component({
  standalone: true,
  imports: [MatIconModule, NgIf, AsyncPipe, NgClass, LoaderComponent],
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [smoothAppear],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Input() title = '';
  @Input() isLarge = false;
  @Input() isShown = true;
  isLoading$
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.isLoading$ = this.modalService.isLoading$;
  }

  onHide() {
    this.modalService.hide();
  }
}
