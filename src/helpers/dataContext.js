import React from 'react'

export const UserContext = React.createContext({
    firstName: "test",
    email: "test@gmail.com",
    getValueFromInputs: (e) => {}
    }
);