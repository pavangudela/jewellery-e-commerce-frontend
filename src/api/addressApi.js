import api from "./apiClient";

 export const getAddresses=()=>api.get("/address")
 export const addAddress=(data)=>api.post("/address/add",data)
 export const getAdrressById=(id)=>api.get(`/address/${id}`)
 export const editAddress=(id,data)=>api.put(`/address/update/${id}`,data)
 export const deleteAddress=(id)=>api.delete(`/address/delete/${id}`)
 export const getDefaultAddress=()=>api.get("/address/default");