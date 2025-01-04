import Constants from 'expo-constants';

const origin = Constants.manifest?.debuggerHost?.split(':').shift();

const VITE_LOCAL_URL = process.env.EXPO_PUBLIC_LOCAL_URL;
const VITE_LIVE_URL = process.env.EXPO_PUBLIC_LIVE_URL;

export const API_URL = origin === "http://localhost:8081" || origin === "192.168.0.101:8081" ? VITE_LOCAL_URL : VITE_LIVE_URL;
