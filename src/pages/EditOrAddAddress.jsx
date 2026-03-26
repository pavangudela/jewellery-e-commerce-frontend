import {useEffect, useState} from "react"
import {addAddress,getAdrressById,editAddress} from "../api/addressApi";
import {useNavigate, useParams} from "react-router-dom";
import { notifyError, notifySuccess } from "../components/notification";
 

 const EditOrAddAddress=()=>{
  const {Id}=useParams()
  const methodType=Id === "add"?"add":"edit";
const navigate=useNavigate();
const [data,setData]=useState({
    name:"",
    contactNumber:"",
    pinCode:"",
    state:"",
    area:"",
    landMark:"",
    buildingName:"",
    isDefault:false

})

const {name,contactNumber,pinCode,state,area,landMark,buildingName,isDefault}=data;
useEffect(()=>{
  if(methodType==="edit"){
    getAdrressById(Id).then((res)=>setData(res.data))
    .catch((err)=>console.log(err))
  }
},[Id,methodType])

const changeHandler=(e)=>{
    const {name,value,type,checked}=e.target;
    setData(prev=>({...prev,[name]:type === 'checkbox'?checked:value}));
    console.log(data)
}
const submitHandler= async(e)=>{
    e.preventDefault()
     
     
        try{
          if(methodType==="add"){
     const response= await addAddress(data);
     notifySuccess(" new Address added")
     console.log(response.data)
          }
          else{
            await editAddress(Id,data).then((res)=>console.log(res))
            notifySuccess("address updated")
          }
          navigate("/profile")
        }
        catch(err){
           notifyError("somthing wrong went")
            console.log(err)
        }
    
   
}

    return(
      <div>
        <h4>{methodType==="add"?"Add Address":"Update Address"}</h4>
  <form className="p-4 border rounded shadow-sm bg-light" onSubmit={submitHandler}>
  <div className="row mb-3">
    <div className="col-md-6">
      <label htmlFor="name" className="form-label fw-semibold">Name</label>
      <input type="text" className="form-control" id="name" name="name" value={name} onChange={changeHandler} placeholder="Full name" required/>
    </div>

    <div className="col-md-6">
      <label htmlFor="contactNumber" className="form-label fw-semibold">Contact Number</label>
      <input type="tel" className="form-control" id="contactNumber" name="contactNumber" value={contactNumber}onChange={changeHandler} placeholder="10-digit mobile" required/>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-md-4">
      <label htmlFor="pinCode" className="form-label fw-semibold">Pin Code</label>
      <input type="number" className="form-control" id="pinCode" name="pinCode" value={pinCode} onChange={changeHandler} placeholder="e.g. 560001" required/>
    </div>

    <div className="col-md-8">
      <label htmlFor="state" className="form-label fw-semibold">State</label>
      <input type="text" className="form-control" id="state" name="state" value={state} onChange={changeHandler} placeholder="State name" required/>
    </div>
  </div>

  <div className="mb-3">
    <label htmlFor="area" className="form-label fw-semibold">Area</label>
    <textarea className="form-control" id="area" name="area" value={area} onChange={changeHandler} rows="2" placeholder="e.g.  kukatpally,hyderabad" required></textarea>
  </div>

  <div className="row mb-3">
    <div className="col-md-6">
      <label htmlFor="landMark" className="form-label fw-semibold">Landmark</label>
      <input type="text" className="form-control" id="landMark" name="landMark" value={landMark} onChange={changeHandler} placeholder="Near..." />
    </div>

    <div className="col-md-6">
      <label htmlFor="buildingName" className="form-label fw-semibold">Building Name</label>
      <input type="text" className="form-control" id="buildingName" name="buildingName" value={buildingName} onChange={changeHandler} placeholder="Building / House No." />
    </div>
  </div>

  <div className="form-check mb-3">
    <input className="form-check-input" type="checkbox" id="isDefault" name="isDefault" checked={isDefault} onChange={changeHandler}/>
    <label className="form-check-label" htmlFor="isDefault">Set as Default</label>
  </div>

  <button type="submit" className="btn btn-primary w-100">{methodType==="add"?"Add ":"Update"}</button>
</form>
</div>

    )
 }
 export default EditOrAddAddress