 import React, { useEffect, useState } from 'react'
import { getOrderById,updateOrderItemStatus } from '../api/orderApi'
import { useParams } from 'react-router-dom'
import { notifyError, notifyInfo } from '../components/notification';
 
 const ManageOrderItems = () => {
   const {id}=useParams();
   const [order,setOrder]=useState({})  
 
  const [selectedStatus,setSelectedStatus]=useState({})
   const orderStatuses = [
  "PLACED",
  "PENDING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
  "REFUNDED"
];
const selectedStatusHandler=(itemId,newStatus)=>{
  setSelectedStatus((prev)=>({
    ...prev,[itemId]:newStatus
  }));
  console.log(selectedStatus)
  console.log(selectedStatus[itemId])

}
    useEffect(()=>{
        const fetchOrderById=async()=>{
            try{
             await getOrderById(id).then((res)=>setOrder(res.data))
       
             
            }
            catch(err){
                console.log(err)
            }
        }
        fetchOrderById();
    },[])
    
      console.log(order)


    const orderItemStatusHandler=async(itemId )=>{
          const newStatus=selectedStatus[itemId]
          if(!newStatus){
            notifyError("Please choose a different status to proceed")
            return
          }
          console.log(newStatus)
          try{
           await updateOrderItemStatus(order.orderId,itemId,newStatus).then((res)=>setOrder(res.data))
           notifyInfo("Item Status Updated");
          }

           catch(err){
            console.log(err.response)
           }

    }
   return (
     <div>
      <div className='fs-2 fw-semibold'> order Items</div>
        {Array.isArray(order.items) &&  order.items.map((item)=>(
<div 
  key={item.productId} 
  className="product-card d-flex align-items-center p-3 mb-3 border rounded shadow-sm bg-white "
>
  <img 
    src={item.productImg} 
    width="80" 
    height="60" 
    alt={item.productName} 
    className="me-3 rounded"
  />

  <div className="flex-grow-1">
 
    <div className="d-flex justify-content-between align-items-center mb-2 ">
      <span>{item.productName}</span> 
      <select className="form-select w-auto ms-5" value={selectedStatus?.[item.id]||item.status}  onChange={(e)=>selectedStatusHandler(item.id,e.target.value) }>
        {orderStatuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
 
    <div className="d-flex justify-content-between align-items-center mb-2">
      <span className="text-muted">
        Status:{" "}
        <span className="text-success fw-semibold ">{item.status}</span> 
      </span> 
       <span className= "">price: {item.price}</span>
      <span className='' >quantity: {item.quantity}</span> <span>lineTotal:{item.lineTotal}</span>
      <button className="btn btn-dark btn-sm" onClick={()=>orderItemStatusHandler(item.id)}>Update</button>
    </div>
  </div>
</div>

        ))}
        {order.address &&  <div className='text-start mb-2 p-2 ps-4 shadow-sm'>
        <h4>Customer Address</h4>
         <p className="mb-1 fw-semibold">{order.address.name}</p> 
               <p className="mb-1">{order.address.buildingName},{order.address.landMark},{order.address.area} </p>
              <p className="mb-0">{ order.address.state}, India - {order.address.pinCode}</p>
              <p>Mobile No:{order.address.contactNumber}</p> <br/>
              </div>}
            {order &&  <div className='text-start p-2 ps-4 shadow-sm ' >
                <h4 >Order Payment Details</h4> 
                <div className='d-flex justify-content-between'>
                <span >Order Amount  </span> <span >{order.totalPrice}.00</span>
                </div>
                 <div className='d-flex justify-content-between'>
                <span>Order Savings</span> <span>00.00</span>
                </div>
                 <div className='d-flex justify-content-between'>
                <span>Coupon Savings</span> <span>00.00</span>
                </div>
                 <div className='d-flex justify-content-between  border-bottom pb-2 pt-2'>
                <span className='fs-6 fw-semibold'>Order Total</span> <span>{order.totalPrice}.00</span>
                </div>
                  <h6>Payment Mode</h6>
                   <div className='d-flex justify-content-between'>
                <span>{order.paymentType}</span> <span>{order.totalPrice}.00</span>
                </div>
              </div>}
                 {order && <div className='d-flex justify-content-between p-2 ps-4'>
               <p> <span>Order ID :</span> <span>#{order.orderId}</span></p> <p><span>Placed On</span> <span>{new Date(order.createdAt).toLocaleString("en-GB", {
  day: "numeric",
  month: "short",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
})}</span></p>
                </div> }
     </div>
   )
 }
 
 export default ManageOrderItems
 