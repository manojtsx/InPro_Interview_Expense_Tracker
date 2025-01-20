// interfaces/Notification.ts
export interface Notification {
    _id: string;
    userId: string;
    message: string;
    type: string;    // e.g., warning, info, reminder
    isRead: boolean; // True if the notification is read
    createdAt: Date;
  }
  