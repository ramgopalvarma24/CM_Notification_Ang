import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListComponent } from './notification-list.component';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NotificationService } from '../Services/notification.service';
import { NotificationMessage } from '../interface/notification-message.model';




describe('NotificationListComponent', () => {
  let component: NotificationListComponent;
  let fixture: ComponentFixture<NotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
