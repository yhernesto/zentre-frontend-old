/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_PREFIX_BASE: string;
  readonly VITE_DEFAULT_LANGUAGE: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_BACKEND_HOST: string;
  readonly VITE_APP_API_LOGIN_PREFIX_BASE: string;
  readonly VITE_APP_API_PUBLIC_PREFIX_BASE: string;
  readonly VITE_APP_API_WEB_PREFIX_BASE: string;
  readonly VITE_TENANCY_HEADER_KEY: string;
  //readonly GOOGLE_MAPS_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}