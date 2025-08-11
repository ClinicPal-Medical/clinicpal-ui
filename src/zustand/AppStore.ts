import { ApiResponse, GET, POST } from "@/lib/api";
import { ApiErrorResponse, Appointment, AppointmentSummary, Clinic, User } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CreateAppointmentRequest } from "./types/requestTypes";
import { LoginFormInputs } from "@/app/login/page";
import { deleteSessionCookie, setSessionCookie } from "@/lib/serverActions";
export interface AppStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  clinic: Clinic | null;
  setClinic: (clinic: Clinic) => void;
  logIn: ({ email, password }: LoginFormInputs) => Promise<User>;
  logOut: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  errors: ApiErrorResponse[] | null;
  setErrors: (errors: ApiErrorResponse[]) => void;
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
  setErrors([]);
  try {
    const response: ApiResponse<Appointment> = await POST("/appointment", payload);

    if (response?.error) {
      setErrors([response.error]);
      return Promise.reject(response.error);
    } else {
      if (!response?.data) {
        setLoading(false);
        return Promise.reject({ error: "No data returned from API" });
      }
      return response.data;
    }
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};

const getAppointments = async (): Promise<[AppointmentSummary] | []> => {
  setLoading(true);
  setErrors([]);

  const response: ApiResponse<[AppointmentSummary]> = await GET(`/appointments`);

  if (response?.error) {
    setErrors([response.error]);
    setLoading(false);
    return Promise.reject();
  } else {
    if (response?.data) {
      const appointmentData: [AppointmentSummary] = response?.data;

      setLoading(false);
      return appointmentData;
    }
    setLoading(false);
    return Promise.reject();
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
  const response: ApiResponse<[]> = await GET(`/${searchBy}/search`, { query });

  if (response?.error) {
    setErrors([response.error]);
    setLoading(false);
    return Promise.reject();
  } else {
    if (response?.data) {
      const suggestions: [] = response?.data;

      setLoading(false);
      return suggestions;
    }
    setLoading(false);
    return Promise.reject();
  }
};

const loginUser = async ({ email, password }: LoginFormInputs): Promise<User> => {
  const payload = {
    email: email,
    password: password,
  };

  setLoading(true);
  setErrors([]);

  const response: ApiResponse<User> = await POST("/auth/login", payload);

  if (response?.error) {
    setErrors([response.error]);
    setLoading(false);
    return Promise.reject();
  } else {
    if (response?.data) {
      const user: User = response?.data;

      if (user.id) {
        await setSessionCookie(user);
      }

      setLoading(false);
      return user;
    }
    setLoading(false);
    return Promise.reject();
  }
};

const logoutUser = async () => {
  clearUser();
  await deleteSessionCookie();
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }, false, "SET_USER"),
        clearUser: () => set({ user: null }, false, "CLEAR_USER"),
        clinic: null,
        setClinic: (clinic) => set({ clinic }, false, "SET_CLINIC"),
        logIn: loginUser,
        logOut: logoutUser,
        isLoading: false,
        setLoading: (isLoading) => set({ isLoading }, false, "SET_LOADING"),
        errors: null,
        setErrors: (errors) => set({ errors }, false, "SET_ERRORS"),
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

const { setLoading, user, setErrors, clearUser } = useAppStore.getState();
