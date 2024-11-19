import { Routes } from '@angular/router';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
//import { NotificationListComponent } from './components/notification-list/notification-list.component';
//import { NotificationFormComponent } from './components/notification-form/notification-form.component';


export const routes: Routes = [
    {path : '', component: NotificationFormComponent},
    {path : 'notifications', component: NotificationListComponent},
    {path : 'notifications/new', component: NotificationFormComponent},
    {path : 'notifications/edit/:id', component: NotificationFormComponent},
    {path: '', redirectTo: 'notifications', pathMatch: 'full'},
    {path: 'test',component: SidebarComponent}
];
