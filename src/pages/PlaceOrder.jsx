import React, { useEffect, useState } from 'react'
import { getDefaultAddress } from '../api/addressApi'
  import { getCart } from '../api/cartApi';
  import { getProfile } from '../api/userApi';
import { notifyError, notifyInfo, notifySuccess } from '../components/notification';
import { placeNewOrder } from '../api/orderApi';
import { checkout, verify } from '../api/payment';
import { useNavigate } from 'react-router-dom';
 

const PlaceOrder = () => {
     var order =0;
       const [address,setAddress]=useState({}); 
        const [cartdata,setCartdata]=useState({})
          const [cartItems,setCartItems]=useState([])
          const[userData,setUserData]=useState({});
           const [selected, setSelected] = useState("");
           const navigate=useNavigate();
           
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
               const fetchCart=async()=>{
                 try{
                   const response= await getCart() ;
                    setCartItems(response.data.items)
                   setCartdata(response.data)
                  
                   
                   
                   console.log(response.data.items.length)
                 }
                 catch(err){
                   console.log(err)
                 }
               }
               fetchCart()
          },[])
useEffect(()=>{
   
    try{
    getDefaultAddress().then((address)=>{
        setAddress(address.data)
        console.log(address.data)
    });   
    }
    catch(err){
        console.log(err);
    }
},[])

const proceedPayment= async()=>{
  console.log("hi")
  try{
  if(!selected){
    notifyError("select any payment method");
    return;
     
  }else if(selected==="COD"){
      placeNewOrder(selected,address.id).then((res)=>console.log(res));
  }
  else{
  var ress=  await placeNewOrder(selected,address.id).then((res)=>order=res.data.orderId);
        
    await checkout(order).then((res)=>{
     
      const data=res.data;

      
       var options  = {
          "key": data.keyId,  
          "amount": data.amount,       
          "currency": data.currency,
          "order_id": data.razorpayOrderId,        
          "handler": function (response){

            
                navigate("/profile")

              verify(  response.razorpay_order_id,
                 response.razorpay_payment_id,
                  response.razorpay_signature).then((vRes)=>notifyInfo(vRes.data.message));

          },
          "prefill":{
              "name":  userData.userName,
              "email": userData.userEmail,
          },
          "theme": { "color": "#3399cc" }

          };
          const rzp = new window.Razorpay(options);
           rzp.open();

        e.preventDefault();
     
        })

  
 }
}
catch(err){
  console.log(err);
}
  console.log(selected)
}

return (
  <div className="container-fluid mt-5 px-4">

   
    <div className="row">
      <div className="col-12 col-md-8 text-start" style={{ paddingRight: "360px" }}>
        <h1 className="science-gothic text-uppercase mb-4">Checkout</h1>

        <h5 className="  text-uppercase mb-3">My Information</h5>

        <p> {userData.userName} <br/>{userData.userEmail}</p>
         
        <hr />

        <h5 className="text-uppercase">Billing Address</h5>

        <div className="mt-3">
           
            
            <p className="mb-0 ">
              {address.buildingName},{address.landMark}   <br />
              {address.area}<br/> {address.state}-{address.pinCode}
            </p>
       
          
          <hr />
           <h5 className="text-uppercase">Delivery</h5>
           <p> {address.name} <br/> {address.contactNumber}</p>
       <hr/>
        <h5 className="text-uppercase">Payment</h5>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

  
  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
    <input 
      type="radio" 
      name="paymentMethod" 
      value="COD"
       checked={selected === "COD"}
          onChange={(e) =>{
            setSelected(e.target.value)
            console.log(selected)
            }}/>
    <span className="custom-radio"></span>
    Cash On Delivery
  </label>
  <br/>
 
  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
    <input 
      type="radio" 
      name="paymentMethod" 
      value="online"
       checked={selected === "online"}
          onChange={(e) => setSelected(e.target.value)}
    />
    <span className="custom-radio"></span>
    Online Payment
  </label>

</div>
        </div>
      </div>
    </div>

 
    <div
      className="d-none d-md-block position-fixed"
      style={{
        top: "120px",       
        right: "40px",     
        width: "420px",    
        zIndex: 1000
      }}
    >
     

      <div className="  p-3 bg-white">
         <div className="d-flex justify-content-between mb-2">
        <span className='text-uppercase'>DISCOUNTS</span>
        <span>NA</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Order value</span>
        <span>{cartdata.subtotal}</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>delivery fee</span>
        <span>Rs.0.00</span>
      </div>

      <div className="d-flex justify-content-between fs-5 mb-3">
        <span>TOTAL</span>
        <span>Rs.{cartdata.subtotal}</span>
      </div>
     <button className="btn btn-dark w-100 mt-4" onClick={()=>proceedPayment()}>
          Proceed to Payment
        </button>
      </div>
    </div>

   
    <div className="d-block d-md-none mt-4">
      

      <div className="  p-3 bg-white">
        <div className="d-flex justify-content-between mb-2">
        <span>Discounts</span>
        <span>NA</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Order value</span>
        <span>{cartdata.subtotal}</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>delivery fee</span>
        <span>Rs.0.00</span>
      </div>

      <div className="d-flex justify-content-between fs-5 mb-3">
        <span>TOTAL</span>
        <span>Rs.{cartdata.subtotal}</span>
      </div>
 
        <button className="btn btn-dark w-100 mt-4" onClick={()=>proceedPayment()}>
          Proceed to Payment
        </button>
      
      </div>
    </div>
  </div>
);



}

export default PlaceOrder
