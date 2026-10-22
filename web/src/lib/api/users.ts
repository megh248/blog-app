import { apiRequest } from "./client";
import type { ChangePasswordPayload, UserProfile } from "../../features/auth/types";

export function fetchCurrentUser(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/user/");
}

export function changePassword(payload: ChangePasswordPayload): Promise<void> {
  return apiRequest<void>("/user/password", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
