import { usePrivy } from "@privy-io/react-auth";
import axios, {
  type Method,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { useCallback } from "react";

const SOMETHING_WENT_WRONG = "Something went wrong";

export const useHttp = () => {
  const { getAccessToken } = usePrivy();

  const fetch = useCallback(
    async <T>(
      url: string,
      method: Method,
      data?: any,
      params?: any,
      includeAuth: boolean = true,
      requestType?: string,
      withCredentials: boolean = false
    ): Promise<AxiosResponse<T>> => {
      const accessToken = await getAccessToken();
      const instance = axios.create({
        baseURL: import.meta.env.VITE_REWARDS_BACKEND,
        headers: {
          ...(requestType && { "X-Request-Type": requestType }),
          ...(includeAuth &&
            accessToken && { Authorization: `bearer ${accessToken}` }),
        },
        withCredentials,
      });

      const config: AxiosRequestConfig = {
        url,
        method,
        ...(data && { data }),
        ...(params && { params }),
      };

      instance.interceptors.request.use(
        (req) => req,
        (error) => Promise.reject(error)
      );

      instance.interceptors.response.use(
        (res) => {
          const cookies = res.headers["set-cookie"];
          if (cookies) {
            cookies.forEach((cookie: string) => {
              document.cookie = cookie;
            });
          }
          return res;
        },
        (error) => {
          let errorMessage = "";
          if (error.response) {
            errorMessage = `${error.response.data?.message || error.response.data?.errorMessage}`;
          } else if (error.request) {
            errorMessage += SOMETHING_WENT_WRONG;
          } else {
            errorMessage += SOMETHING_WENT_WRONG;
          }

          return Promise.reject(errorMessage);
        }
      );

      const response = await instance.request<T>(config);
      return response;
    },
    [getAccessToken]
  );

  return { fetch };
};
