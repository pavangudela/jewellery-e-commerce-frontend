 import React, { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../api/userApi'
import { notifyError, notifyInfo } from '../components/notification';
 
 const ManageUsers = () => {
   const [users,setUsers]=useState([]);
useEffect(()=>{
   try{
     getUsers().then((items)=>{
      
       if(JSON.stringify(items.data)!==JSON.stringify(users)){

      setUsers(items.data) 
     }  }
    )
}
catch(err){
  console.log(err);
  notifyError("somthing went wrong");

}
 },[users])

 const removeUser=async (id)=>{
  try{
   const response=await deleteUser(id);
     notifyInfo(response.data.message)
  }
  catch(err){
    console.log(err.response.data)
    notifyError("somthing went wrong");
  }
 }

console.log(users);
   return (
     <div>
      Manage Users 
    
    {users && users.map((user)=>(
    <div className='m-2 border' key={user.id}>
      <p>username : {user.username}</p> 
      <p>user mail : {user.email}   </p>
      <p>role : {user.role}   </p>
      <p className='text-end'>    <span className='m-2 text-danger cursor-pointer' onClick={()=>removeUser(user.id)} >delete</span> <span className='m-2 text-primary cursor-pointer'>change role</span></p>

      </div>
     

   ) )}   

     </div>
   )
 }
 
 export default ManageUsers
 