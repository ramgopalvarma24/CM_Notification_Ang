import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../Services/notification.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { NotificationMessage } from '../interface/notification-message.model';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-notification-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,CommonModule,RouterLink],
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.css'
})

export class NotificationFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  notifications: NotificationMessage[] = [];
  //test data
  
  currentNotification: NotificationMessage | null = null;
  filteredNotifications = [...this.notifications];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadNotifications();
    this.form = this.createForm();
    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadNotifications();
    if (id) {
      this.isEdit = true;
      this.loadNotification(id);
    }
  }

  loadNotification_edit(id: number) : void{
    this.isEdit = true;
    this.loadNotification(id);
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
      documentTemplateID: [null]
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
      this.currentNotification = notification;
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
      repeatFields.forEach(field => this.form.get(field)?.enable());
    } else {
      repeatFields.forEach(field => this.form.get(field)?.disable());
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const currentUser = 'Ram'; //it can take it from logged in user
      const notification: NotificationMessage = {
        ...this.form.getRawValue(),
        repeatNotification: this.form.get('repeatNotification')?.value ? 'Y' : 'N',
        useDocumentTemplate: this.form.get('useDocumentTemplate')?.value ? 'YES' : 'NO',
      };

      if (this.isEdit) {
        // Update existing notification
        notification.updatedDate = new Date(); // Set updated date
        notification.updatedBy = currentUser; 
        console.log(notification);

        this.notificationService
          .updateNotification(notification.notificationMessageId, notification)
          .subscribe(() => {
            this.loadNotifications();
            this.resetForm();
          });
      } else {
        // Create new notification
        console.log("check notification");
        console.log(notification)
        notification.createdDate = new Date(); 
        notification.createdBy = currentUser;
        notification.notificationMessageId = 0;
        console.log(notification);
        this.notificationService.createNotification(notification).subscribe(() => {
          this.loadNotifications();
          this.resetForm();
        });
      }
    }
  }

  resetForm(): void {
    this.isEdit = false;
    this.form.reset();
    this.form.patchValue({ notificationChannel: 'E', repeatNotification: false });
    this.toggleRepeatFields();
  }

  onCancel(): void {
    this.isEdit = false;
    this.currentNotification = null;
    this.form.reset();
    this.toggleRepeatFields();
  }

  addNewNotification(): void {
    this.resetForm();
    this.isEdit = false;
  }


  filterByMessageId(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase(); // Get input value
    this.filteredNotifications = this.notifications.filter(notification =>
      notification.notificationMessageId.toString().toLowerCase().includes(query) // Compare with query
    );
  }

  filterBySubject(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredNotifications = this.notifications.filter(notification =>
      notification.notificationSubject.toLowerCase().includes(query)
    );
  }

  onDelete(): void {
    if (this.currentNotification) {
      const confirmDelete = confirm(
        `Are you sure you want to delete notification ID ${this.currentNotification.notificationMessageId}?`
      );

      if (confirmDelete) {
        this.notificationService.deleteNotification(this.currentNotification.notificationMessageId).subscribe(
          () => {
            alert('Notification deleted successfully!');
            this.loadNotifications();
            this.resetForm();

          },
          (error) => {
            console.error('Error deleting notification:', error);
          }
        );
      }
    } else {
      alert('No notification selected for deletion.');
    }
  }
}





