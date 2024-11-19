import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationMessage } from '../interface/notification-message.model';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'https://localhost:44331/api/Notification'; // Update with your API URL
  
  constructor(private http: HttpClient) { }

  getNotifications(): Observable<NotificationMessage[]> {
    return this.http.get<NotificationMessage[]>(this.apiUrl);
  }

  getNotification(id: number): Observable<NotificationMessage> {
    return this.http.get<NotificationMessage>(`${this.apiUrl}/${id}`);
  }

  createNotification(notification: NotificationMessage): Observable<NotificationMessage> {
    return this.http.post<NotificationMessage>(this.apiUrl, notification);
  }

  updateNotification(id: number, notification: NotificationMessage): Observable<NotificationMessage> {
    return this.http.put<NotificationMessage>(`${this.apiUrl}/${id}`, notification);
  }

  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



}
