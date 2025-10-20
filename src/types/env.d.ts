/**
 * Type definitions for environment variables used in the Vite project.
 *
 * These interfaces extend the default `ImportMetaEnv` and `ImportMeta` types
 * to provide type safety and IntelliSense for your environment variables.
 *
 * @see https://vitejs.dev/guide/env-and-mode.html
 */

/**
 * Defines the structure of available environment variables.
 *
 * All variables must be prefixed with `VITE_` to be exposed to the client.
 */
interface ImportMetaEnv {
    /**
     * Base URL for API requests.
     * Example: `"https://api.example.com"`
     */
    readonly VITE_API_BASE_URL: string;

    /**
     * Public API key used for authenticating client-side requests.
     * Example: `"12345-abcdef"`
     */
    readonly VITE_API_KEY: string;
}

/**
 * Extends the default `ImportMeta` interface to include typed environment variables.
 */
interface ImportMeta {
    readonly env: ImportMetaEnv;
}