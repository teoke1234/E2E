import { RoleType } from '@constants/roles';

export const loginCredential = [
  {
    role: 'admin' as RoleType,
    email: 'admin-dev@checkly.com',
    password: 'password123',
  },
  {
    role: 'userA' as RoleType,
    email: 'user-dev@checkly.com',
    password: 'password123',
  }
];