import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class NotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { description: string; title: string }
  ) {
    this.dialogRef.updatePosition({ right: '1rem', top: '1rem' });
    this.dialogRef.addPanelClass('notification-container')
  }
}
