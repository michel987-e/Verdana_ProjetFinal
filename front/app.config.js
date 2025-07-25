import 'dotenv/config';

export default {
  name: 'Verdana',
  slug: 'Verdana',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  plugins: ['expo-secure-store', 'expo-notifications'],
  sdkVersion: '53.0.0',
  platforms: ['ios', 'android', 'web'],
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  ios: {
    supportsTablet: true
  },
  android: {
    edgeToEdgeEnabled: true,
    googleServicesFile: './google-services.json',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    IP_ADDRESS: process.env.IP_ADDRESS,
    eas: {
      projectId: '10590d5c-bd4c-4fee-a5e7-a9d5a068961a'
    }
  }
};
