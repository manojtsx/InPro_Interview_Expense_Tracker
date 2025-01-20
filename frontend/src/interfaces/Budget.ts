// interfaces/Budget.ts
export interface Budget {
    _id: string;
    userId: string;
    month: number;   // e.g., 1 for January
    year: number;    // e.g., 2025
    categoryId?: string; // Optional, for category-specific budgets
    limit: number;   // Budget limit amount
    createdAt: Date;
    updatedAt: Date;
  }
  