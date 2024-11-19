export interface NotificationMessage {
    notificationMessageId: number;
    notificationChannel: string;
    notificationHeading: string;
    notificationBody: string;
    notificationFooter: string;
    notificationSubject: string;
    repeatEvery?: number;
    noOfTimesToRepeat?: number;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    repeatNotification?: string;
    useDocumentTemplate?: string;
    documentTemplateID?: number;
  }