import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = ({children}) =>{
    const {user} = useAuth()

    if(user) return <Navigate to="/notes" replace/>
    return children
}

export default GuestRoute