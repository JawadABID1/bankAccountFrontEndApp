// formatDate.ts

/**
 * Utility function to format a date into a readable string.
 *
 * @param date - The date to be formatted (either a Date object or a date string).
 * @param options - Optional formatting options, such as weekday, month, day, etc.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    // Ensure the date is a valid Date object
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date provided');
    }

    // Default formatting options if none are provided
    const defaultOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // Use the provided options or fallback to default ones
    const finalOptions = options || defaultOptions;

    // Format the date with the given options
    return parsedDate.toLocaleDateString(undefined, finalOptions);
};
