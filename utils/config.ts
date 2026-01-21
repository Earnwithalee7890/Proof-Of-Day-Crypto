// Environment configuration helpers
export const getEnvVar = (key: string, defaultValue = ''): string => {
  return process.env[key] || defaultValue;
};

export const requireEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

export const config = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  },
  neynar: {
    apiKey: getEnvVar('NEYNAR_API_KEY'),
  },
  app: {
    name: 'TrueScore',
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  },
};
