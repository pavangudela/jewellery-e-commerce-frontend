 import React, { useState } from 'react'
import { register } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../components/notification';
 
 const Register = () => {
  const [err,setErr]=useState("");
    const navigate=useNavigate();
const [data,setData]=useState({
    username:"",
    email:"",
    password:"",
    checkPassword:""
    
});
const{username,email,password,checkPassword}=data;

const onchangeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
    console.log(data);
};
  const submitHandler= async(e)=>{
    e.preventDefault();
    if(!username||!email||!password||!checkPassword){
        alert("feilds should not be empty")
        return;
    }
if(password===checkPassword){
try{
   await register(data).then((res)=>{
       notifySuccess(res.data.message);
        navigate("/login")
    })
}
catch(err){
    console.log(err)
    setErr(err.response.data.error);
}

}
else{
   notifyError("password is mismatched")
}

  }
   return (
     <div>
       <h4>Sign up</h4>  <br/> 
         
         {err && <p className='text-danger'>{err}</p>}
       <form onSubmit={ submitHandler}>

        <input type='text' placeholder=' Enter your name' name='username' value={username} onChange={onchangeHandler} /> <br/> <br/>
        <input type='text' placeholder='Enter your Mail-Id' name='email' value={email} onChange={onchangeHandler}/> <br/> <br/>
        <input type='password' placeholder='Enter Password' name='password' value={password} onChange={onchangeHandler} /> <br/> <br/>
        <input type='password' placeholder='Re-Enter Password'  name='checkPassword' value={checkPassword}  onChange={onchangeHandler}/> <br/> <br/>
        <input type='submit'/>
       </form>
       <br/> ___or___ 
       <br/>
       <p    className='text-primary cursor-pointer' onClick={()=> navigate("/login")}>Sign in ?</p>
     </div>
   )
 }
 
 export default Register
 