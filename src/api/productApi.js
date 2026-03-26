import api from "./apiClient";

  
  export const getProducts=()=>api.get("/products");
  
  export const getProductById=(productId)=>api.get(`/products/${productId}`);

  export const addProduct=(product)=>api.post("/products/admin/product/add",product);

  export const updateProduct=(id,product)=>api.put(`/products/admin/product/update/${id}`,product);

  export  const deleteProduct=(id)=>api.delete(`/products/admin/product/delete/${id}`);