import { APP_URL } from "@/lib/constants";   
import axios, { AxiosError } from "axios";

export const  api = axios.create({
    baseURL: APP_URL,
    withCredentials: true,
    withXSRFToken: true,

});

api.defaults.headers.common.Accept = 'application/json'
api.defaults.headers.common['Content-Type'] = 'application/json'

export async function csrf() {
    return api.get<void>("/sanctum/csrf-cookie")
}

export type ParsedErrorResponse<T> = {
    message: string;
    fields: Array<{ name: T; messages: string[] }>;
  }  

  export function parseErrorResponse<T = string>(axiosError: AxiosError<{
    message?: string;
    errors?: { [key: string]: string[] }
  }>): ParsedErrorResponse<T> {
    let message = "Oops! Something went wrong."
    let fields: Array<{ name: T; messages: string[] }> = []
  
    if (axiosError.response?.data.message) {
      message = axiosError.response.data.message
    }
  
    if (axiosError.response?.data.errors) {
      fields = Object.entries(axiosError.response.data.errors).map(([name, messages]) => ({
        name: name as T,
        messages
      }))
    }
  
    return {
      message,
      fields
    }
  }