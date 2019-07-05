const envPrefix = 'REACT_APP_';

const getEnvVar = (key) => {
  if (process.env[envPrefix + key] === undefined) {
    throw new Error(`Variable "${key}" doesn't exist in environment.`);
  }

  return process.env[envPrefix + key];
};

export const API = getEnvVar('API');