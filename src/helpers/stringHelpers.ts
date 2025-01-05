export const toCamelCase = (str: string): string => {
    return (
        str
            // Split on spaces, slashes, and other special characters
            .split(/[\s/]+/)
            // Convert to camelCase
            .map((word, index) => {
                // Make everything lowercase first
                word = word.toLowerCase();
                // Capitalize first letter of each word except first word

                word = word === '%' ? 'percentage' : word;
                return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join('')
    );
};
