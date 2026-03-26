import React, { useEffect, useState } from 'react'
import { getProductById  } from '../api/productApi'
import { addToCart } from '../api/cartApi';
import { useParams } from 'react-router-dom';
import { notifyError, notifySuccess } from '../components/notification';
const ProductDetails = () => {
    const{productId}=useParams()
    console.log(productId)
    const[productDetails,setProductDetails]=useState({});
    const [role,setRole]=useState("");
    const [auth,setAuth]=useState(!!localStorage.getItem("auth"))
    
    useEffect(()=>{
        const fetchProduct=async()=> {
            try{
            const response=await getProductById(productId)
               setProductDetails(response.data)
               console.log(response.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchProduct();
  },[])
  useEffect(()=>{
    if(auth){
      setRole(localStorage.getItem("role"))
    }
  })
  const addToCartHandler= async()=>{
   try{
   console.log( (await addToCart(productDetails.id,1)).data)
   notifySuccess("item added to cart successfully")
   }
   catch(err){
    console.log(err.response)
    notifyError("somthing went wrong");
   }     
  }
  return (

    <div className="container my-5">
  <div className="row">
    {/* Product Image */}
    <div className="col-md-6 d-flex justify-content-center">
      <img 
        src={productDetails.imageUrl} 
        alt={productDetails.name} 
        className="img-fluid rounded shadow-sm" 
        style={{ maxHeight: "500px", objectFit: "cover" }}
      />
    </div>

    {/* Product Details */}
    <div className="col-md-6">
      <h2 className="fw-bold mb-3">{productDetails.name}</h2>
      <p className="text-muted mb-1">Category: <strong>{productDetails.category}</strong></p>
      <p className="text-muted mb-3">{productDetails.description}</p>

      <h4 className="fw-bold text-dark mb-3">{productDetails.price}</h4>

      <div className="mb-3">
        <span className="badge bg-success">In Stock:{productDetails.quantity}</span>
      </div>

      {/* <div className="d-flex align-items-center mb-4">
        <button className="btn btn-outline-secondary btn-sm me-2">-</button>
        <span className="px-3">1</span>
        <button className="btn btn-outline-secondary btn-sm">+</button>
      </div> */}

     {role===''||role!=="ADMIN"? <button className="btn btn-dark btn-lg w-100" onClick={()=>addToCartHandler()} >Add to Cart</button>:null} 
    </div>
  </div>
</div>

  )
}

export default ProductDetails
