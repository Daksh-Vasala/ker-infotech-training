export enum UserRole {
  ADMIN = "admin",
  SUBSCRIBER = "subscriber",
}

export interface DecodedToken {
  userId: number;
  userRole: string;
  iat: number;
  exp: number;
}

export interface AuthContextType {
  userId: number | null;
  userRole: string | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
}