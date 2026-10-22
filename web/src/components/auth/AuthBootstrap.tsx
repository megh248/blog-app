import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "../../features/auth/authStore";
import { fetchCurrentUser } from "../../lib/api/users";
import { ApiError } from "../../lib/api/client";

export function AuthBootstrap() {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
    enabled: Boolean(token),
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.error instanceof ApiError && query.error.status === 401) {
      logout();
    }
  }, [query.error, logout]);

  return null;
}
