 import React, { useEffect, useState } from 'react'
import { getAllorders } from '../api/orderApi';
import { useNavigate } from 'react-router-dom';
 
 const ManangeOrders = () => {
   const [orders,setOrders]=useState([]);
  const navigate=useNavigate();

    useEffect(()=>{
        const fetchAllOrders=async()=>{
            try{
            await getAllorders().then((res)=>{
                  console.log(res.data) 
                if(JSON.stringify(res.data)!==JSON.stringify(orders)){
                   setOrders(res.data)
                 console.log(orders) 
                }
                
            },[orders]);
           
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllOrders();
      console.log(orders)  
    } )
 
   return (
     <div>
    manage Orders
     {orders && orders.map((item)=>(
       
            <div key={item.orderId}  className='card text-center shadow-sm border-1 cursor-pointer' onClick={()=>navigate(`/manageOrderItems/${item.orderId}`)}>
            <h5>OrderId : #{item.orderId}</h5>
            <h6>UserEmail : {item.userEmail}</h6>
            <h6>Total Amount : ₹ {item.totalPrice}</h6>
            </div>
      ))}
     </div>
   )
 }
 
 export default ManangeOrders
 