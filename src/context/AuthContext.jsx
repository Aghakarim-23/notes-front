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

        const user = res.data.user       
        
        localStorage.setItem("accessToken", res.data.token)
        localStorage.setItem("user", JSON.stringify(user))
        setToken(res.data.token)
        setUser(res.data.user)

        return res
    } catch (error) {
        console.log(error)
        throw error;
    } finally {
        setLoading(false)
    }
}

const logout = () => {
    setUser(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")

}

const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
}

useEffect(() => {
    const storedToken = localStorage.getItem("accessToken")
    const user = localStorage.getItem("user")

        if(storedToken && user) 
            try {
            setUser(JSON.parse(user))
            setToken(storedToken)
            } catch (error) {
            console.error("Failed to parse user from localStorage", error);
          setUser(null);
          setToken(null);    
        }
        setLoading(false)
},[])

    return(
        <AuthContext.Provider value={{login, logout, register, token, user, setUser, loading, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () =>  useContext(AuthContext)

