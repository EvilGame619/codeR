import { Navigate, Outlet } from "react-router-dom";
import isAuthenticated from "../Authentication/IsAuthenticated";

export default function PrivateRoutes(){
    return isAuthenticated()?<Outlet/> : <Navigate to={"/auth/login"}/>;
    
}