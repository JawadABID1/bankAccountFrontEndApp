// logger.ts

class Logger {
    /**
     * Logs an informational message to the console.
     * @param message - The message to log.
     */
    static info(message: string): void {
        console.info(`INFO: ${message}`);
    }

    /**
     * Logs a warning message to the console.
     * @param message - The message to log.
     */
    static warn(message: string): void {
        console.warn(`WARN: ${message}`);
    }

    /**
     * Logs an error message to the console.
     * @param message - The message to log.
     * @param error - Optional error object to log.
     */
    static error(message: string, error?: Error): void {
        console.error(`ERROR: ${message}`, error ? error.stack : '');
    }

    /**
     * Logs a debug message to the console.
     * @param message - The message to log.
     */
    static debug(message: string): void {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`DEBUG: ${message}`);
        }
    }
}

export default Logger;
