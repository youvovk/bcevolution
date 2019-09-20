
export const checkPasswordLength = (input) => {

    if (input.length === 8) {
        return true;
    } else {
        return false;
    }
};

export const checkSpecial = (input) => {
    return (input.length > 0 && (!/[^a-zA-Z0-9\-\/]/.test(input)));
};

export const checkLetter = (input) => {

    if (input.length > 0) {
        return input.toUpperCase() != input;
    }

    return false;
};

export const checkOnlyLetters = (input) => {
    // return (!/[^a-zA-Z\s\-\/]/.test(input) && !/\s/.test(input));
    return (!/[^a-zA-Z\s\-\/]/.test(input));
};

export const checkCap = (input) => {

    let bool = false;

    if (input.length > 0) {
        for (let i = 0; i <= input.length; i++) {
            if (!/[^A-Z\-\/]/.test(input[i])) {
                bool = true;
            }
        }
    }

    return bool;
};

export const checkOnlyNumbers = (input) => {

    return !/[^0-9\-\/]/.test(input);

}

export const checkNumber = (input) => {

    let bool = false;

    if (input.length > 0) {
        for (let i = 0; i <= input.length; i++) {
            if (!/[^0-9\-\/]/.test(input[i])) {
                bool = true;
            }
        }
    }

    return bool;

}

export const validateEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}
