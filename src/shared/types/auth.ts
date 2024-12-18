import { Roles } from "./roles";
declare global {
  namespace Express {
    export interface Request {
      user: AuthPayload;
    }
  }
}

export interface AuthPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
}