import { AppointmentStatus, AppointmentTypes } from "@/lib/enums";

export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  appointmentType: AppointmentTypes;
  appointmentDateTime: string;
  appointmentStatus: AppointmentStatus;
}
