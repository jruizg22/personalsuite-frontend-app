import axios, {type AxiosInstance} from "axios";

/**
 * Axios instance configured for API requests.
 *
 * This instance provides a centralized HTTP client for the application,
 * automatically including the base API URL and API key for authentication.
 *
 * The configuration also includes interceptors to:
 *  - Attach the API key to each request.
 *  - Handle and format API error responses consistently.
 *
 * @see https://axios-http.com/docs/instance
 */
const axiosInstance: AxiosInstance = axios.create({
    /**
     * Base URL for all API requests.
     *
     * Defined in the Vite environment as `VITE_API_BASE_URL`.
     * Example: `"https://api.example.com"`
     */
    baseURL: import.meta.env.VITE_API_BASE_URL
});

/**
 * Request interceptor
 *
 * Attaches the `X-API-Key` header to every outgoing request using the value
 * of `VITE_API_KEY` from environment variables.
 *
 * If no key is defined, the header is omitted.
 */
axiosInstance.interceptors.request.use(
    (config) => {
        const apiKey: string = import.meta.env.VITE_API_KEY;
        if (apiKey) {
            config.headers["X-API-Key"] = apiKey;
        }
        return config;
    },
    (error: any) => Promise.reject(error)
);

/**
 * Response interceptor
 *
 * Handles API errors by standardizing error messages for Axios errors
 * that include a response from the server.
 *
 * If the error contains a `detail` message from the backend,
 * it is included in the final error message for easier debugging.
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: any) => {
        if (axios.isAxiosError(error) && error.response) {
            const message: string = error.response.data?.detail || "Unknown error";

            error.message = "API returned error: " + message;

            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

/**
 * Exported Axios instance
 *
 * @example
 * ```ts
 * import axiosInstance from "@/services";
 *
 * const response = await axiosInstance.get("/users");
 * console.log(response.data);
 * ```
 */
export default axiosInstance;