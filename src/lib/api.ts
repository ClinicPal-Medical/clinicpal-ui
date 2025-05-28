import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiErrorResponse } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = "http://localhost:8080";
const API_KEY = "naveen";
const API_SECRET = "naveen";
const CORRELATION_ID = "naveen";

export async function POST(endpoint: string, data?: any): Promise<AxiosResponse<any, any>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY,
    "X-API-SECRET": API_SECRET,
    "X-Correlation-ID": CORRELATION_ID,
  };

  try {
    const response: AxiosResponse<any, any> = await axios.post(url, data, { headers });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(axiosError?.response?.data.description || "Login failed");
  }
}
