import { useContext } from "react"
import {AuthContext} from "./AuthContext"

export const login = (email,password,role) => {
    return fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({email: email, password: password, role: role}),
        headers: {
            "content-type": "application/json"
        }
    })
}

export const logout = () => {
    return fetch("/auth/logout", {
        method: "POST"
    })
}

export const useAuth = () => {
    return useContext(AuthContext)
}