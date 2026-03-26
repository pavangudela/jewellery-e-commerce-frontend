import api from "./apiClient"
export const getCart= ()=> api.get("/cart");

export const updateQty=(productId,qty)=> 
    api.patch(`/cart/item/${productId}`,{qty:qty});
 export const deleteItem=(productId)=>
    api.delete(`/cart/item/${productId}`)
export const addToCart=(prodId,qty)=>api.post("/cart/item",
   {productId:prodId,
        qty:qty});
 