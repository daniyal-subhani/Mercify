const ENV_KEYS = {
  BACKEND_BASE_URL: "VITE_BACKEND_BASE_URL",
};

export const getEnv = (key) => {
  const envVars = ENV_KEYS[key];
  const value = import.meta.env[envVars];
  if (!value) {
    throw new Error(`${key} is missing or not defined`);
  }
};
