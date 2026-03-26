 import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../api/productApi'
import { useNavigate } from 'react-router-dom'
import EditOrAddProduct from './EditOrAddProduct'
import { notifyError, notifyInfo, notifySuccess } from '../components/notification'
 
 const ManageProducts = () => {
       const [products,setProducts]=useState([])
      const [reload,setReload]=useState(false);
 const navigate=useNavigate();
  
    const fetchProducts=async ()=>{
      try{

       await getProducts().then((res)=>{
        // if(JSON.stringify(res.data)!==JSON.stringify(products)){
        setProducts(res.data)

        // }
      }
      )
      
      }
      catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
    fetchProducts();
    console.log(products)
  },[reload])

  const removeProduct=async(productId)=>{

     try{
     await deleteProduct(productId);
      notifySuccess("product deleted successfully");
       setReload(!reload)
     }
     catch(err){
      console.log(err);
      notifyError("somtihng went wrong");
     }
     
  }
   return (
    <div> 

       Manage Products
     
     <div className='row'>
      <div className='text-end mb-4 '> <button className="btn btn-dark " onClick={()=>navigate(`/edit or add product/add`)}> Add Product</button></div>
            
        {products && products.map((product)=>(
          <div className='col-md-3 mb-2' key={product.id}>
      
  <div className='card h-100  d-flex flex-column p-0 mb-0'  style={{width:'15rem' }}>


<img src={product.imageUrl}   className='card-img-top' height="150"/>

<div className='card-body mt-auto'>
   <h5>{product.name}</h5>
      <h6>Price : ₹{product.price}</h6>
      <p>Stock : {product.quantity}</p>
      <p>{product.description}</p>
      <p className='d-flex justify-content-between align-items-center' ><span className='text-primary cursor-pointer' onClick={()=>navigate(`/edit or add product/${product.id}`)}>Edit</span> <span className='text-danger cursor-pointer' onClick={()=> removeProduct(product.id)} >Delete</span></p>
      <p className='text-start'>Product Id :{product.id}</p>
    </div>
 
        </div> 
        </div>
        ))}
     
   
     </div>
     </div>
   )
   
 }
 
 export default ManageProducts;
 