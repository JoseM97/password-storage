import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'eclipse',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#343434',
      layoutName: 'eclipse',
      showSpinner: true,
      androidSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
    }
  }
};

export default config;
