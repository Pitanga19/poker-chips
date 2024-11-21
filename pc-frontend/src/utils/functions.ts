export const isNumericString = (value: string): boolean => {
    const numericRegex = /^[0-9]+$/; // Solo permite números del 0 al 9
    return numericRegex.test(value);
};

export const getFloorFromString = (value: string): string => {
    const intValue = parseInt(value);
    return intValue.toString();
};