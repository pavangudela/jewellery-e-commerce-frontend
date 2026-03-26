import {Navigate} from "react-router-dom";
export default function ProtectedRoute({children ,RequiredRole}){
    const role=localStorage.getItem("role");
    const token=localStorage.getItem("token");
   
    if(!token) return <Navigate to="/login"/>
    if(role!==RequiredRole) return <Navigate to="/unauthorized"/>

    return children;

 }