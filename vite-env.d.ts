/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_ENV_NAME: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_DESCRIPTION: string;
    readonly VITE_FAVICON_ICO: string;
    readonly VITE_FAVICON_SVG: string;
    readonly VITE_APPLE_TOUCH_ICON: string;
    readonly VITE_APP_ICON_64: string;
    readonly VITE_APP_ICON_192: string;
    readonly VITE_APP_ICON_512: string;
    readonly VITE_APP_ICON_MASKABLE: string;
    readonly VITE_APP_VERSION: string;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  