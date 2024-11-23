import { IP, PORT } from "./constants";

export const getApiUrl = (gameId: string) => `http://${IP}:${PORT}/api/${gameId}`;

export const isNumericString = (value: string): boolean => {
    const numericRegex = /^[0-9]+$/; // Solo permite números del 0 al 9
    return numericRegex.test(value);
};

export const getFloorFromString = (value: string): string => {
    const intValue = parseInt(value);
    return intValue.toString();
};

export const isAlphanumericString = (value: string): boolean => {
    const numericRegex = /^[a-zA-Z0-9 ]*$/; // Solo permite números del 0 al 9
    return numericRegex.test(value);
};