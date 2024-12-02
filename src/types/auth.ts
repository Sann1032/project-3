export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  role?: UserRole;
  firmId?: string;
  emailVerified: boolean;
  isAdmin?: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  firmName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export type UserRole = 'admin' | 'firm' | 'client';

export interface FirmUser extends User {
  role: 'firm';
  firmId: string;
  firmName: string;
}

export interface ClientUser extends User {
  role: 'client';
  firmId: string;
}