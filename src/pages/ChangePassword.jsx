 import React, { useState } from 'react'
import { data } from 'react-router-dom'
import { changePassword } from '../api/userApi'

 const ChangePassword = () => {
  const [error,setError]=useState("")
   const [data,setData]=useState({
         oldPassword:"",
         newPassword:"",
         checkPassword:""
   })
    const {oldPassword,newPassword,checkPassword}=data
   const changeHandler= (e) =>{
    setData({...data,[e.target.name]:e.target.value})
   
  };  
   const submitHandler= e =>{
    e.preventDefault();
    setError("")
   const changepassword = async ()=>{
    if(newPassword===checkPassword){

    try{
       const response= await changePassword(oldPassword,newPassword) 
       console.log(response.data)
       alert(response.data.message)
    }
    catch(err){
      console.log(err.response.data.error)
      setError(err.response.data.error ||"Something Wrong")
    }
  }else{
    console.log("not same")
    setError("The new password and re-entered password must be the same.")
  }
    
   }
   changepassword();
   };

   return (
     <div>
       <form  onSubmit={ submitHandler}>
        {error&&<div style={{color:"red"}}>{error}</div>}
        <input type='password' placeholder='Enter old password'name='oldPassword' value={oldPassword} onChange={changeHandler}/><br/><br/>
        <input type='password' placeholder='Enter new password'name='newPassword'  value ={newPassword} onChange={changeHandler}/><br/><br/>
        <input type='password' placeholder='ReEnter new password' name='checkPassword' value={checkPassword} onChange={changeHandler}/><br/><br/>
        <button type='submit' >submit</button>
       </form>
     </div>
   )
 }
 
 export default ChangePassword
 