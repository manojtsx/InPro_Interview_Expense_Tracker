// interfaces/User.ts
export interface User {
    _id: string;
    name: string;
    email: string;
    currency: string; // e.g., USD, EUR
    createdAt: Date;
    updatedAt: Date;
  }
  