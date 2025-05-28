import { UserRoles } from "./enums";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  contactNumber: string;
  address: string;
  role: UserRoles;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface ApiErrorResponse {
  status: number;
  error: string;
  description: string;
  path: string;
}
