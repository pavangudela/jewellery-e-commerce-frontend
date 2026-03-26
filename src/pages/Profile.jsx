import { useEffect, useState } from "react";
import { getProfile } from "../api/userApi";
import { useNavigate } from "react-router-dom";
 import { IconLogout } from '@tabler/icons-react';
import { deleteAddress, editAddress, getAddresses, getAdrressById  } from "../api/addressApi";
import { getMyorders } from "../api/orderApi";
import { notifyError, notifyInfo, notifySuccess } from "../components/notification";

const Profile=({auth,setAuth})=>{
   const  Navigate=useNavigate()
  const [menuItems,setMenuItems] =useState( ["Orders","Address",  "Settings"]);
   const [addresses,setAddresses]=useState([])
   const [orders,setOrders]=useState([])
const [userdata,setUserData]=useState({});
const [activeItem,setActiveItem]=useState( localStorage.getItem("actItem")||"Orders")
const role=localStorage.getItem("role")


const logoutHandler=()=>{
   localStorage.clear();
   
 
   setAuth(false)
  }

 useEffect(()=>{
if(role==='ADMIN'){
setMenuItems(["Settings"])
setActiveItem("Settings")
}
 },[activeItem])

useEffect(()=>{
  const fetchOrders=async()=>{
    try{
    const response=await getMyorders()
    setOrders(response.data)
    console.log(response.data)
    }
    catch(err){
      console.log(err.response.data)
    }
  }
  fetchOrders();
},[])
 
useEffect(()=>{
    const fetchProfile= async()=>{
        try{
    const profile=await getProfile()
    setUserData(profile.data)
        }
        catch(err){
            console.log(err)
        }
}
fetchProfile();
},[]) 

useEffect(()=>{
  const getMyaddresses= async()=>{ 
    try{
      const response=await getAddresses();
      setAddresses(response.data)
      console.log(response.data)
  }
  catch(err){
    console.log(err)
  }}
  getMyaddresses();
},[])
const deleteAddressHandler=async(id)=>{
  try{
   const response= await deleteAddress(id)
   console.log(response.data)
   setAddresses(response.data)
   notifyInfo("Address removed")
  }
  catch(err){
   notifyError("something wrong went")
    console.log(err)
  }

}
const makeDefaultHandler=async(id)=>{
  try{
  const  response=await getAdrressById(id);
   response.data.isDefault=true
    console.log(response.data)
    const res=  await editAddress(id,response.data);
    console.log(res.data)
    setAddresses(res.data)
  }
   catch(err){
    console.log(err)
    notifyError("somithing wrong went")
   }
}
const renderContent = () => {
    switch (activeItem) {
      case "Address":
        return (
          <div>
            <h4 className="fw-bold mb-3">Your Addresses</h4>
            
            <div className="text-end " >
           <span className="text-primary fw-semibold cursor-pointer" onClick={()=>Navigate("/editOrAddAddress/add")} >+add address</span> 
           </div>
           {addresses.filter((item) =>item.isDefault).map(item =>(
          <div  key={item.id} className="border rounded p-3 m-2">
                 {item.isDefault===true?<h6 className="text-success text-start  fw-semibold" >Default</h6>:null}
              <p className="mb-1 fw-semibold">{item.name}</p>
              <p className="mb-1">{item.buildingName},{item.landMark},<br/>{item.area} </p>
              <p className="mb-0">{ item.state}, India - {item.pinCode}</p>
              <p>Mobile No:{item.contactNumber}</p> <br/>
              <p className="text-end  " > <span className="me-3 text-primary cursor-pointer" onClick={()=>Navigate(`/editOrAddAddress/${item.id}`)}>edit</span>     <span className="text-danger cursor-pointer" onClick={()=>deleteAddressHandler(item.id)}>remove</span></p>

            </div>
           ))}
            {addresses.map((item)=>{
           return ( item.isDefault==false &&<div  key={item.id} className="border rounded p-3 m-2">
          
              <p className="mb-1 fw-semibold">{item.name}</p>
              <p className="mb-1">{item.buildingName},{item.landMark},{item.area} </p>
              <p className="mb-0">{ item.state}, India - {item.pinCode}</p>
              <p>Mobile No:{item.contactNumber}</p> <br/>
              <p className="text-end  " >{item.isDefault===false?<span className="me-3 text-primary  cursor-pointer" onClick={()=>makeDefaultHandler(item.id)}>make default</span>:null} <span className="me-3 text-primary cursor-pointer" onClick={()=>Navigate(`/editOrAddAddress/${item.id}`)}>edit</span>     <span className="text-danger cursor-pointer" onClick={()=>deleteAddressHandler(item.id)}>remove</span></p>

            </div>)
            
     } )}
          </div>
        );

      case "Orders":
        return (
          <div>
            <h4 className="fw-bold mb-3">Your Orders</h4>
            <p className="text-secondary">Here are your recent orders.</p>
            {orders.map((order)=>(
              <div key={order.orderId}>
              <p>order Id :#{order.orderId}</p>
              {order.items.map((item)=>(
               
 <div 
  key={item.productId} 
  className="product-card d-flex align-items-center p-3 mb-3"
>
  <img 
    src={item.productImg} 
    width="80" 
    height="60" 
    alt={item.productName} 
    className="me-3 rounded"
  />
  <div>
    <p className="fw-semibold mb-1 fs-5">{item.productName}</p>
    <p className="mb-0 text-muted">
      Status: <span className="text-success fw-semibold">{item.status}</span>
    </p>
  </div>
</div>



              ))}
               
            </div>
            ))}
           
          </div>
        );

      case "Settings":
        return (
          <div>
            <h4 className="fw-bold mb-3">Account Settings</h4>
            <p className="text-secondary">Update your account </p>
            <div className="border rounded p-3">
              <p>UserName : {userdata.userName}  <span className="text-primary" onClick={()=>Navigate("/updateUserName")} style={{cursor:"pointer"}}>Update</span></p>
              <p>Email :{userdata.userEmail}     <span onClick={()=> alert("this future we will enable soon ")} className="text-primary" style={{cursor:"pointer"}}>Change</span></p>
               <p className="fw-semibold cursor-pointer" onClick={()=>Navigate("/changePassword")}  >Change password </p>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h4 className="fw-bold mb-3">Account Settings</h4>
            <p className="text-secondary">Update your account </p>
            <div className="border rounded p-3">
              <p>UserName : {userdata.userName}  <span className="text-primary" onClick={()=>Navigate("/updateUserName")} style={{cursor:"pointer"}}>Update</span></p>
              <p>Email :{userdata.userEmail}     <span onClick={()=> alert("this future we will enable soon ")} className="text-primary" style={{cursor:"pointer"}}>Change</span></p>
               <p className="fw-semibold cursor-pointer" onClick={()=>Navigate("/changePassword")}  >Change password </p>
            </div>
          </div>
        );
    }
  };

  return (
   <div className="d-flex" style={{ minHeight: "100vh" }}>
  
  {/* FIXED SIDEBAR */}
  <div
    className="d-flex flex-column p-4 position-fixed top-0 start-0 h-100"
    style={{
      width: "250px",
      backgroundColor: "#f8f9fa",
      borderRight: "1px solid #ddd",
      zIndex: 1030, // stays above content
      overflowY: "auto" // only if content becomes long
    }}
  >
    <h5 className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: "1px" }}>
      My Account
    </h5>

    <ul className="list-unstyled m-0 p-0">
      {menuItems.map((item) => (
        <li
          key={item}
          onClick={() => {
            setActiveItem(item);
            localStorage.setItem("actItem", item);
          }}
          className={`
            py-2 px-3 mb-2 rounded-2 fw-semibold
            ${activeItem === item ? "bg-dark text-white" : "text-secondary"}
          `}
          style={{
            cursor: "pointer",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease"
          }}
        >
          {item}
        </li>
      ))}
    </ul>

    {auth && (
      <span
        className="text-danger cursor-pointer mt-auto"
        onClick={logoutHandler}
      >
        <IconLogout stroke={2} />
      </span>
    )}
  </div>

  {/* MAIN CONTENT — SHIFT RIGHT BECAUSE SIDEBAR IS FIXED */}
  <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
    {renderContent()}
  </div>

</div>

  );
  
}
export default Profile;