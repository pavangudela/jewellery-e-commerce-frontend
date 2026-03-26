import api from "./apiClient";

 export const getMyorders=()=>api.get("/orders/my-orders");

 export const getAllorders=()=>api.get("/orders");
 export const getOrderById=(id)=>api.get(`orders/${id}`)
 export const  updateOrderItemStatus=(orderId,itemId,status)=>api.put("orders/admin/update-order-item-status",
  {
    orderId:orderId,
    itemId:itemId,
    status:status
  })

  export const placeNewOrder=(paymentType,addressId)=>api.post("orders/new",{paymentType:paymentType,addressId:addressId});