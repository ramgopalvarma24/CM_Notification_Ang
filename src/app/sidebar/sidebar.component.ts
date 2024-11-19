import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,CommonModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems = [
    { icon: 'home', label: 'HR' },
    { icon: 'event', label: 'Leave' },
    { icon: 'attach_money', label: 'Payroll' }
  ];

}

/*

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../Services/notification.service';
import { NotificationMessage } from '../interface/notification-message.model';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css'],
})
export class NotificationFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  notifications: NotificationMessage[] = [];
  filteredNotifications: NotificationMessage[] = [];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadNotifications();
  }

  createForm(): FormGroup {
    return this.fb.group({
      notificationMessageId: [{ value: 0, disabled: true }],
      notificationChannel: ['E', Validators.required],
      notificationHeading: ['', Validators.required],
      notificationBody: ['', Validators.required],
      notificationFooter: [''],
      notificationSubject: ['', Validators.required],
      repeatNotification: [false],
      repeatEvery: [{ value: null, disabled: true }],
      noOfTimesToRepeat: [{ value: null, disabled: true }],
      useDocumentTemplate: [false],
      documentTemplateID: [null],
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notifications = data;
      this.filteredNotifications = [...this.notifications];
    });
  }

  loadNotification(id: number): void {
    const notification = this.notifications.find(
      (n) => n.notificationMessageId === id
    );
    if (notification) {
      this.isEdit = true;
      this.form.patchValue(notification);
      if (notification.repeatNotification === 'Y') {
        this.form.patchValue({ repeatNotification: true });
        this.toggleRepeatFields();
      }
    }
  }

  toggleRepeatFields(): void {
    const repeatFields = ['repeatEvery', 'noOfTimesToRepeat'];
    if (this.form.get('repeatNotification')?.value) {
      repeatFields.forEach((field) => this.form.get(field)?.enable());
    } else {
      repeatFields.forEach((field) => this.form.get(field)?.disable());
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const notification: NotificationMessage = {
        ...this.form.getRawValue(),
        repeatNotification: this.form.get('repeatNotification')?.value ? 'Y' : 'N',
        useDocumentTemplate: this.form.get('useDocumentTemplate')?.value ? 'YES' : 'NO',
      };

      if (this.isEdit) {
        // Update existing notification
        this.notificationService
          .updateNotification(notification.notificationMessageId, notification)
          .subscribe(() => {
            this.loadNotifications();
            this.resetForm();
          });
      } else {
        // Create new notification
        this.notificationService.createNotification(notification).subscribe(() => {
          this.loadNotifications();
          this.resetForm();
        });
      }
    }
  }

  onCancel(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.isEdit = false;
    this.form.reset();
    this.form.patchValue({ notificationChannel: 'E', repeatNotification: false });
    this.toggleRepeatFields();
  }

  addNewNotification(): void {
    this.resetForm();
    this.isEdit = false;
  }

  filterByMessageId(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredNotifications = this.notifications.filter((notification) =>
      notification.notificationMessageId.toString().toLowerCase().includes(query)
    );
  }

  filterBySubject(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredNotifications = this.notifications.filter((notification) =>
      notification.notificationSubject.toLowerCase().includes(query)
    );
  }
}

*/