import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api.js";
export const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("accessToken"))
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    


const register = async (form) => {
    setLoading(true)
    try {
        const res = await api.post("/api/auth/register", form)
        return res
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)   
    }
}


  const login = async (form) => {
    setLoading(true)
    try {
        const res = await api.post("/api/auth/login", form, )
        
        localStorage.setItem("accessToken", res.data.token)
        setToken(res.data.token)
        setUser(res.data.user)
        return res
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}

const logout = () => {
    setUser(null)
    localStorage.removeItem("accessToken")
}


useEffect(() => {
    const storedToken = localStorage.getItem("accessToken")

        if(storedToken) {
            setUser({token: storedToken})
            setToken(storedToken)
        }
        setLoading(false)
},[])

    return(
        <AuthContext.Provider value={{login, logout, register, token, user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () =>  useContext(AuthContext)

