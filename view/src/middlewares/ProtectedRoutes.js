import { Outlet } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

const useAuth=()=>{
    return JSON.parse(localStorage.getItem("auth"))
}

export const ProteCtedRoutes=()=>{
    const isAuth = useAuth()
    return isAuth? <Outlet/>: <HomePage/>
}