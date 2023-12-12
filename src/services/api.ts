import axios, { AxiosError } from "axios";
import { getRefreshToken, getToken, setToken } from "./authStorage";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config: any) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => error
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = await getRefreshToken()

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          process.env.EXPO_PUBLIC_API_URL + "/auth/refresh",
          {
            refreshToken: refreshToken,
          }
        );

        setToken(response.data.accessToken);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log("refreshError", refreshError)
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);
