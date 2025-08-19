import axios from "axios";
import type {
  AxiosInstance,
  Method,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import * as Sentry from "@sentry/react";
/**
 * Axios api config to use to call api calls
 * @param url path
 * @param method Method type
 * @param data payload or query param. pass null if its get and when query or path parameters have to be passed
 * @param params query string params
 * @returns api response or error
 */

const SOMETHING_WENT_WRONG = "Something went wrong";

export const apiConfig = async <T>(
  url: string,
  method: Method,
  data?: any,
  params?: any,
  includeAuth?: boolean,
  requestType?: string,
  withCredentials?: boolean
): Promise<AxiosResponse<T>> => {
  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SOLMAIL_BACKEND_API,
    headers: {
      ...(requestType && { "X-Request-Type": requestType }),
      ...(includeAuth && {
        Authorization: `${localStorage.getItem("auth:token")}`,
      }),
    },
    withCredentials,
  });
  const requestConfig: AxiosRequestConfig = {
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
        errorMessage = `${errorMessage} ${
          error.response.data?.message || error.response.data?.errorMessage
        }`;
      } else if (error.request) {
        errorMessage += SOMETHING_WENT_WRONG;
      } else {
        errorMessage += SOMETHING_WENT_WRONG;
      }
      localStorage.clear();
      window.location.reload();
      Sentry.captureException(error, {
        tags: { type: "axios-request" },
      });
      return Promise.reject(errorMessage);
    }
  );

  const response: AxiosResponse<T> = await instance.request<T>(requestConfig);
  return response;
};

export type { AxiosResponse };

export default apiConfig;
