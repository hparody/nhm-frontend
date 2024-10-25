/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_API_KEY: string;
  readonly VITE_GOOGLE_SHEETS_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
