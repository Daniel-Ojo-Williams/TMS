import { Roles } from "./roles";

export interface AuthPayload {
  sub: string;
  email: string;
  role: Roles;
}