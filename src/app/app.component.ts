import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import { NotificationListComponent } from "./notification-list/notification-list.component";


import { ReactiveFormsModule } from '@angular/forms';
import { NotificationFormComponent } from "./notification-form/notification-form.component";





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatListModule, MatSidenavModule, MatToolbarModule, MatIcon, MatIconModule,NotificationListComponent,
    CommonModule, ReactiveFormsModule, NotificationFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CM05_Notification_App';
}
