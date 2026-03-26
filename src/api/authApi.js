import { data } from "react-router-dom"
import api from "./apiClient"

 export const login=(email,password)=>api.post("/auth/login",{email:email,password:password})

 export const register=(data)=>api.post("/auth/register",data);