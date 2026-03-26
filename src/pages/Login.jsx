import { useEffect, useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../components/notification";

 const Login=({setAuth})=>{
    const navigate=useNavigate()
    const [errorMsg,setErrorMsg]=useState()
const [data,setData]=useState({
   email:"",
   password:"" 
})
const {email,password}=data;
 const submitHandler=async(e)=>{
    e.preventDefault()
    if(!email||!password){
         notifyError("email and password  should  not be Empty")
        return;
    }
        try{
        const response= await login(email,password);
        notifySuccess("login successfully");
        console.log( response.data)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("role",response.data.role)
        setAuth(true)
        if(response.data.role==='ADMIN'){
            navigate("/admin")
        }
        else{
        navigate("/")
        }
        }
        catch(err){
            console.log(err.response.data)
            setErrorMsg(err.response.data.error ||"something wrong went")
        }
    }




 const onChangeHandler=(e)=>{
e.preventDefault()
setData({...data,[e.target.name]:e.target.value})
console.log(data)
 }
return (
    <div>
        <h4>Sign in</h4>
        <form onSubmit={submitHandler}>
           <input placeholder="Enter Email-Id" type="mail" name="email" value={email} onChange={onChangeHandler}/>  <br/> <br/>
        
          
           <input placeholder="Enter Password" type="password" name="password" value={password} onChange={onChangeHandler}/><br/> <br/>
           {errorMsg &&<p style={{color:"red"}}>{errorMsg}</p>}
           <input type="submit"/> 
        </form> <br/>
        <p>___or___</p>
        <br/>
        <p className="text-primary  cursor-pointer " onClick={()=> navigate("/register")}>sign up ?</p>
    </div>
)
}
 export default Login;