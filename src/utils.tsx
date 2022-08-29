import { Notyf } from "notyf";

export const notyf = new Notyf({
    position: { x: "center", y: "bottom" },
});

export const isUpperCase = (s: string) => {
    if (s.length === 0 || s.length > 1) {
        return false;
    }
    if (
        "A".charCodeAt(0) <= s.charCodeAt(0) &&
        s.charCodeAt(0) <= "Z".charCodeAt(0)
    ) {
        return true;
    }
    return false;
};

export const isLowerCase = (s: string) => {
    if (s.length === 0 || s.length > 1) {
        return false;
    }
    if (
        "a".charCodeAt(0) <= s.charCodeAt(0) &&
        s.charCodeAt(0) <= "z".charCodeAt(0)
    ) {
        return true;
    }
    return false;
};

export const isLetter = (s: string) => isLowerCase(s) || isUpperCase(s);
