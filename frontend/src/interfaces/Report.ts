// interfaces/Report.ts
export interface Report {
    _id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    categories: {
      categoryId: string; // References Categories._id
      total: number;      // Total expenses for this category
    }[];
    totalSpent: number;
    createdAt: Date;
  }
  