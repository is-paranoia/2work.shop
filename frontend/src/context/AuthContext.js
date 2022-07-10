import { createContext } from "react";

function empty_func() {

}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: empty_func,
    logout: empty_func,
    isAuthenticated: false
})