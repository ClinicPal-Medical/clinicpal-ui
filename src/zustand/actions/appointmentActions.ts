"use server";

import { GET, POST } from "@/lib/api";
import { AppointmentTypes, AppointmentStatus } from "@/lib/enums";
import { ApiErrorResponse, Appointment } from "@/lib/types";
import { AxiosError, AxiosResponse } from "axios";

export async function createAppointment(appointmentData: {
  patientId: string;
  doctorId: string;
  appointmentType: AppointmentTypes;
  appointmentDateTime: string;
  appointmentStatus: AppointmentStatus;
}): Promise<Appointment> {
  const payload = {
    ...appointmentData,
    createdBy: "naveen",
  };

  try {
    const response: AxiosResponse = await POST("/appointment", payload);
    const appointment: Appointment = response?.data;

    return appointment;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(axiosError?.response?.data.description || "Failed to create appointment");
  }
}

export async function predictiveSearch(query: string, type: "patient" | "doctor"): Promise<[]> {
  let searchBy: string;

  switch (type) {
    case "patient":
      searchBy = "patient";
      break;
    case "doctor":
      searchBy = "users";
      break;
    default:
      throw new Error("Invalid search type. Use 'patient' or 'doctor'.");
  }

  try {
    const response: AxiosResponse = await GET(`/${searchBy}/search`, { query });
    const results: [] = response?.data;

    return results;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return [];
  }
}
