import { AppointmentStatus, AppointmentTypes, UserRoles } from "./enums";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  suggestionText: string;
  title: string;
  email: string;
  contactNumber: string;
  address: string;
  role: UserRoles;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  suggestionText: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  address: string;
  contactNumber: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface Appointment {
  id: string;
  patient: Patient;
  doctor: User;
  appointmentType: AppointmentTypes;
  appointmentStatus: AppointmentStatus;
  appointmentDateTime: string;
}
export interface AppointmentSummary {
  id: string;
  patient: string;
  doctor: string;
  appointmentType: AppointmentTypes;
  appointmentStatus: AppointmentStatus;
  appointmentDateTime: string;
}

export interface ApiErrorResponse {
  status: number;
  error: string;
  description: string;
  path: string;
}
