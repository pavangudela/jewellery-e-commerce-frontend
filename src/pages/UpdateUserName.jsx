import React, { useState } from 'react'
import { changeUserName } from '../api/userApi'
import { notifySuccess } from '../components/notification'
import { useNavigate } from 'react-router-dom'
const UpdateUserName = () => {
  const navigate=useNavigate();
  const [username,setUsername]=useState("")
  const [errMsg,setErrMsg]=useState("")
    const submitHandler=(e)=>{
      e.preventDefault();
      console.log(username)
      const updateusername= async()=>{
        setErrMsg("")
        try{
        const response = await changeUserName(username);
        notifySuccess("username updated successfully");
        navigate("/profile");
        console.log(response.data)
        }
        catch(err){
          console.log(err.response.data)
          setErrMsg(err.response.data.error ||"something went wrong");
          
        }
      }
      updateusername();
    }
    const onchangeHandler=(e)=>{
     setUsername(e.target.value)
 
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
         {errMsg&& <div style={{color:"red"}}>{errMsg}

          </div>}
            <input type='text' value={username} onChange={onchangeHandler } placeholder='update userName'  />
            <input type='submit'/>
        </form>
    </div>
  )
}

export default UpdateUserName;
