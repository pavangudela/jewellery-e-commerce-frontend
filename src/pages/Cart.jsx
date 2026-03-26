import React, { useEffect, useState } from 'react'
import axios from "axios"
import { getCart,updateQty,deleteItem } from '../api/cartApi'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
 import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
const Cart = () => {
  const navigate=useNavigate();
   const [cartdata,setCartdata]=useState({})
   const [cartItems,setCartItems]=useState([])
   
   useEffect(()=>{
        const fetchCart=async ()=>{
          try{
            const response= await getCart() ;
             setCartItems(response.data.items)
            setCartdata(response.data)
           
            // console.log(cartdata.get("items"))
            
            console.log(response.data.items.length)
          }
          catch(err){
            console.log(err)
          }
        }
        fetchCart()
   },[])
   const updateCartHandler= async (productId,quantity)=>{
    try{
     const response= await updateQty(productId,quantity) 
       setCartdata(response.data)
       console.log(response.data)
     setCartItems(response.data.items)
   
    }
    catch(err){
      console.log(err)
    }
   }
   const deleteItemHendler= async (productId)=>{
    try{
      const response=await deleteItem(productId)
      console.log(response.data)
      setCartdata(response.data)
      setCartItems(response.data.items)
    }
    catch(err){
      console.log(err)
    }
   }
  


  return (
    // <div>
    //   <p>{cartdata.items[0].productName}</p>
    //   <p>{cartdata.currency}</p>
    //  <h4> {cartdata.subtotal} </h4>
    // </div>
 <div className="container my-5">
  <h2 className="fw-bold mb-3">SHOPPING BAG</h2>
  <div className="alert alert-light border">
    GREAT FASHION AT BETTER PRICES. OUR PRICES ARE INCLUSIVE OF THE REVISED GST STRUCTURE.
  </div>

 
<div className="row mt-4">
  
  <div className="col-lg-6">
    {cartItems.map((item)=>(
   <div key={item.productName} className="card mb-3 border-0 p-2">
  <div className="d-flex align-items-center">

 
    <img 
      src={item.imageUrl} 
      alt={item.productName}
      style={{ width: "128px", height: "192px", objectFit: "cover" }}
      className=" ms-2 me-5"
    />

    
    <div className="d-flex flex-column" style={{ lineHeight: "1.2" }}>

      <h6 className="mb-1 fw-semibold">{item.productName}</h6>
      <p className="fw-bold mb-2">Rs. {item.unitPrice}</p>
 
      <div className="d-flex align-items-center border  border-secondary p-2  mt-2gap-2">

       
  <button className="btn border-0" onClick={() => deleteItemHendler(item.productId)}>
    <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: "22px", color: "#888" }} />
  </button>

  <button className="btn border-0" onClick={() => updateCartHandler(item.productId, item.quantity - 1)}>
    <FontAwesomeIcon icon={faMinus} style={{ fontSize: "20px", color: "#888" }} />
  </button>

  <span style={{ fontSize: "18px" }}>{item.quantity}</span>

  <button className="btn border-0" onClick={() => updateCartHandler(item.productId, item.quantity + 1)}>
    <FontAwesomeIcon icon={faPlus} style={{ fontSize: "20px", color: "#888" }} />
  </button>

      </div>
    </div>

  </div>
</div>



    
      ))}
    
    </div>

 
  <div className="col-lg-4 px-0 ms-auto">
  <div className="card  border-0">
    <div className="card-body">
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

      <button className="btn btn-dark w-100" onClick={() => navigate("/place order")}>
        CONTINUE TO CHECKOUT
      </button>
    </div>
  </div>
</div>
  </div>
  </div>
 

  )
}

export default Cart
