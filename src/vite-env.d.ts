/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_API_KEY: string;
  readonly VITE_GOOGLE_DRIVE_API_KEY: string;
  readonly VITE_GOOGLE_SHEETS_BASE_URL: string;
  readonly VITE_GOOGLE_DRIVE_URL: string;
  readonly VITE_GOOGLE_APP_SCRIPTS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
