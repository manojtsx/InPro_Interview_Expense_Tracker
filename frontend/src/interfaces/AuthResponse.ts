import { User } from "./User";

// interfaces/AuthResponse.ts
export interface AuthResponse {
    user: User;
    token: string; // JWT or other token for authentication
  }
  