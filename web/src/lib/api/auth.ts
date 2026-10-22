import { ApiError, apiRequest, getApiBaseUrl, getErrorDetail } from "./client";
import type { RegisterPayload, TokenResponse } from "../../features/auth/types";

export function registerUser(payload: RegisterPayload): Promise<void> {
  return apiRequest<void>("/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(username: string, password: string): Promise<TokenResponse> {
  const body = new URLSearchParams();
  body.set("username", username);
  body.set("password", password);

  const response = await fetch(`${getApiBaseUrl()}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(getErrorDetail(payload, "Failed to authenticate"), response.status);
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    !("access_token" in payload) ||
    typeof payload.access_token !== "string"
  ) {
    throw new ApiError(
      typeof payload === "string" ? payload : "Failed to authenticate",
      response.status,
    );
  }

  return payload as TokenResponse;
}
