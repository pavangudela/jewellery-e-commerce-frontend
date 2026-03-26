import api from "./apiClient";

 
 export const getProfile=()=>api.get("/user");

 export const changeUserName=(userName)=>api.post(`/user/change-user-name/${userName}`);

 export const changePassword=(oldPassword,newPassword)=>api.post("/user/change-password",{oldPassword:oldPassword,newPassword:newPassword});

 export const  getUsers=()=>api.get("/user/admin/all-users");

 export const deleteUser=(id)=>api.delete(`/user/admin/delete-user/${id}`);