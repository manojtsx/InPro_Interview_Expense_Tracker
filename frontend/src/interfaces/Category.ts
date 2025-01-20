// interfaces/Category.ts
export interface Category {
    _id: string;
    name: string;   // e.g., Food, Travel
    icon: string;   // Icon or image URL for visualization
    userId?: string; // null for global categories, otherwise references Users._id
    createdAt: Date;
    updatedAt: Date;
  }
  