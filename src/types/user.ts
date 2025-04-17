export type UserRole = 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN';

export interface User {
  role: UserRole;
  isLoggedIn: boolean;
} 