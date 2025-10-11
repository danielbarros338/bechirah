import fetchService from "../data/fetchService";
import type { TokenValidateRequest, TokenValidateResponse } from "../types/token";

export default async function useGetValidateToken(data: TokenValidateRequest): Promise<TokenValidateResponse> {
  const response = await fetchService("GET", "verify-token", null, {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${data.token}`,
  });

  return response;
}
