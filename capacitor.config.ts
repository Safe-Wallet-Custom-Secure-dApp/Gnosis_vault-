import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourname.gnosisvault',
  appName: 'Gnosis Vault',
  webDir: 'out',            // or 'build' if using Next.js
  bundledWebRuntime: false,
};

export default config;
