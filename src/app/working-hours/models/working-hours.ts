import { User } from 'src/app/auth/models/user';

export interface WorkingHours {
  id: number;

  month: number;

  year: number;

  numHours: number;

  numOvertime: number;

  daysOff: number;

  user: User;
}
