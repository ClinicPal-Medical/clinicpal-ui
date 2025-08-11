import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiErrorResponse } from "./types";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = "http://localhost:8080";
const API_KEY = "naveen";
const API_SECRET = "naveen";

export interface ApiResponse<T = any> {
  status?: number;
  data?: T;
  error?: ApiErrorResponse;
}

export async function POST<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY,
    "X-API-SECRET": API_SECRET,
    "X-Correlation-ID": uuidv4(),
  };

  try {
    const response: AxiosResponse<T> = await axios.post(url, data, { headers });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      return {
        status: axiosError.response.status,
        error: {
          status: axiosError.response.status,
          error: axiosError.response.data.error || "API_ERROR",
          description: axiosError.response.data?.description,
        },
      };
    }

    return {
      error: {
        status: 500,
        error: "NETWORK_ERROR",
        description: axiosError.message || "Network connection failed",
      },
    };
  }
}

export async function GET<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY,
    "X-API-SECRET": API_SECRET,
    "X-Correlation-ID": uuidv4(),
  };

  try {
    const response: AxiosResponse<T> = await axios.get(url, { headers, params: data });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      return {
        status: axiosError.response.status,
        error: {
          status: axiosError.response.status,
          error: axiosError.response.data.error || "API_ERROR",
          description: axiosError.response.data?.description,
        },
      };
    }

    return {
      error: {
        status: 500,
        error: "NETWORK_ERROR",
        description: axiosError.message || "Network connection failed",
      },
    };
  }
}
