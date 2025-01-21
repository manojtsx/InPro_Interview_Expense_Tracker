// interfaces/Category.ts
export interface Category {
    _id: string;
    name: string;   // e.g., Food, Travel
    icon: string;   // Icon or image URL for visualization
    createdAt: Date;
    updatedAt: Date;
    userId ?:{
      _id: string;
      name: string;
      email: string
    }
  }
  