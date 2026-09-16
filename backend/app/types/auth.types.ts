export enum UserRole {
  Admin = "admin",
  Subscriber = "subscriber",
}

export interface SignUpInput {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  userRole?: UserRole;
}

export interface JwtPayload {
  userId: string;
  email?: string;
  phoneNumber?: string;
  userRole?: UserRole;
  firstName?: string | null;
  lastName?: string | null;
  userName?: string;
}
