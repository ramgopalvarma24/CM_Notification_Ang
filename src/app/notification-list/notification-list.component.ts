import { Component, OnInit } from '@angular/core';

import { RouterLink, Router } from '@angular/router';


import { Form, FormGroup } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NotificationMessage } from '../interface/notification-message.model';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [MatListModule,MatSidenavModule,MatToolbarModule,MatIcon,MatIconModule,CommonModule],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})

export class NotificationListComponent implements OnInit  {
  notifications: NotificationMessage[] = [];

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      data => {
        this.notifications = data
        console.log(this.notifications) //notificationMessageId
        console.log(this.notifications) //notificationMessageId

      }
    );
  }

  getChannelDisplay(channel: string): string {
    const channels = {
      'E': 'Email',
      'M': 'Mobile',
      'B': 'Both'
    };
    return channels[channel as keyof typeof channels] || channel;
  }

  onAdd(): void {
    this.router.navigate(['/notifications/new']);
  }

  onEdit(notification: NotificationMessage): void {
    this.router.navigate(['/notifications/edit', notification.notificationMessageId]);
  }

  onDelete(notification: NotificationMessage): void {
    if (confirm('Are you sure you want to delete this notification?')) {
      this.notificationService.deleteNotification(notification.notificationMessageId)
        .subscribe(() => {
          this.loadNotifications();
        });
    }
  }
}
