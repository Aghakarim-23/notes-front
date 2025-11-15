import { createContext, useContext, useState } from "react";
import api from "../api/api.js";
export const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token" || null))
    


const register = async (form) => {
    try {
        await api.post("/api/auth/register", form)
        return res
    } catch (error) {
        console.error(error)
    }
}


  const login = async (form) => {
    try {
        const res = await api.post("/api/auth/login", form, )
        console.log(res)
        
        localStorage.setItem("token", res.data.token)
        return res
    } catch (error) {
        console.log(error)
    }
}


    return(
        <AuthContext.Provider value={{login, register, token}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () =>  useContext(AuthContext)

