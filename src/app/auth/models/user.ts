import { Gender } from '../enums/gender';
import { Role } from '../enums/role';
import { UserStatus } from '../enums/user-status';

export interface User {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  identifier: string;

  username: string;

  password: string;

  role: Role;

  gender: Gender;

  status: UserStatus;
}
