import fetchService from "../data/fetchService";
import type { LoginRequest, LoginResponse } from "../types/login";

export default async function useGetLogin(data: LoginRequest): Promise<LoginResponse> {
  const body = JSON.stringify(data);  
  const response = await fetchService("POST", "signin", body, {
    "Content-Type": "application/json",
  });

  return response;
}