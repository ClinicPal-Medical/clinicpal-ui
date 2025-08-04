import { GET, POST } from "@/lib/api";
import { Appointment, AppointmentSummary, Clinic, User } from "@/lib/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CreateAppointmentRequest } from "./types/requestTypes";

export interface AppStore {
  user: User | null;
  setUser: (user: User) => void;
  clinic: Clinic | null;
  setClinic: (clinic: Clinic) => void;
  logOut: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  createAppointment: (appointmentData: CreateAppointmentRequest) => Promise<Appointment>;
  getAppointments: () => Promise<[AppointmentSummary] | []>;
  predictiveSearch: (query: string, type: "patient" | "doctor") => Promise<[]>;
}

const createAppointment = async (
  appointmentData: CreateAppointmentRequest,
): Promise<Appointment> => {
  const payload = {
    ...appointmentData,
    createdBy: user?.id,
  };

  setLoading(true);
  try {
    const response: AxiosResponse = await POST("/appointment", payload);
    const appointment: Appointment = response?.data;
    return appointment;
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};

const getAppointments = async (): Promise<[AppointmentSummary] | []> => {
  setLoading(true);
  try {
    const response: AxiosResponse = await GET(`/appointments`);
    const results: [AppointmentSummary] = response?.data;

    return results;
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};

const predictiveSearch = async (query: string, type: "patient" | "doctor"): Promise<[]> => {
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
    throw error;
  }
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }, false, "SET_USER"),
        clinic: null,
        setClinic: (clinic) => set({ clinic }, false, "SET_CLINIC"),
        logOut: () => set({ user: null }, false, "LOG_OUT"),
        isLoading: false,
        setLoading: (isLoading) => set({ isLoading }, false, "SET_LOADING"),
        createAppointment: createAppointment,
        getAppointments: getAppointments,
        predictiveSearch: (query: string, type: "patient" | "doctor") =>
          predictiveSearch(query, type),
      }),
      {
        name: "app-store",
      },
    ),
  ),
);

const { setLoading, user } = useAppStore.getState();
