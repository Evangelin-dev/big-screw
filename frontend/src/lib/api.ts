// src/lib/api.ts
const BASE = (import.meta.env as Record<string, string | undefined>)["VITE_API_URL"] || "http://localhost:8000/api";
const KEY = "bs_admin_token";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// sessionStorage: token is cleared when the tab closes
export const getToken = () => sessionStorage.getItem(KEY);
export const setToken = (t: string) => sessionStorage.setItem(KEY, t);
export const clearToken = () => sessionStorage.removeItem(KEY);

export async function api(
  path: string,
  opts: RequestInit & { auth?: boolean } = {},
): Promise<any> {
  const { auth, headers, ...rest } = opts;
  const token = getToken();
  // File uploads (FormData): the browser must set the multipart Content-Type itself
  const isForm = typeof FormData !== "undefined" && rest.body instanceof FormData;

  const res = await fetch(BASE + path, {
    ...rest,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...(auth && token ? { Authorization: `Token ${token}` } : {}),
      ...headers,
    },
  });

  const data = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      data?.detail ||
      (data && typeof data === "object" ? Object.values(data).flat().join(" ") : "") ||
      `Request failed (${res.status})`;
    throw new ApiError(res.status, msg);
  }
  return data;
}

export async function adminLogin(email: string, password: string) {
  const data = await api("/admin/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
}