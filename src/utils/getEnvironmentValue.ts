export const getEnvironmentValue = (envKey: string, defaultValue?: string | undefined) => {

    const envValue = process.env[envKey]?.trim();

    if (envValue) {
        return envValue;
    }

    if (defaultValue) {
        return defaultValue;
    }

    throw new Error(`Please set the environment variable for "${envKey}"`);

};
