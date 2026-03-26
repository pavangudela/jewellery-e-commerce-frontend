import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct, getProductById, updateProduct } from "../api/productApi";
import { notifyError, notifySuccess } from "../components/notification";

 const EditOrAddProduct=()=>{
    const navigate=useNavigate();
const [product, setProduct] = useState({
  category: "",
  name: "",
  imageUrl: "",
  description: "",
  price: "",
  quantity: ""
});

const {category,name,imageUrl, description,price, quantity}=product;

    const {id}=useParams();

    const methodType=id==="add"?"add":"edit";
   
   

    useEffect(()=>{
      if(methodType==="edit"){
        getProductById(id).then((prod)=> setProduct(prod.data));
      }
    },[]);
  


    const onchangeHandler=(e)=>{
        setProduct({...product,[e.target.name]:e.target.value});
       

    }
const submitHandler= async(e)=>{
        e.preventDefault();
  console.log(product);
    if(methodType==='add'){
    try{
        await addProduct(product);
        notifySuccess("product Added successfully");
        navigate("/manage Products");
    }
    catch(err){
        console.log(err);
        notifyError("somthing went wrong");
    }
     }
    else{
   

    try{
     await updateProduct(id,product);
     notifySuccess("updated successfully");
     navigate("/Manage Products");
     
    }
    catch(err){
        console.log(err);
        notifyError("somthing went wrong");
    }
 
}

}

    return(
        <div>
          {methodType&&   <h4>{methodType==="add"?"Add Product" :"Edit Product"}</h4>}
     <form className="p-4 shadow rounded bg-light" onSubmit={ submitHandler}>
  <div className="mb-3">
    <label className="form-label">Category</label>
    <input type="text" className="form-control"   placeholder="Category" name="category" value={category} onChange={onchangeHandler}/>
  </div>

  <div className="mb-3">
    <label className="form-label">Product Name</label>
    <input type="text" className="form-control" placeholder="Product Name" name="name" value={name} onChange={ onchangeHandler}/>
  </div>

  <div className="mb-3">
    <label className="form-label">Image URL</label>
    <input type="text" className="form-control" placeholder="Image URL" name="imageUrl" value={imageUrl}onChange={ onchangeHandler}/>
  </div>

  <div className="mb-3">
    <label className="form-label">Stock</label>
    <input type="text" className="form-control" placeholder="Stock" name="quantity" value={quantity} onChange={ onchangeHandler}/>
  </div>

  <div className="mb-3">
    <label className="form-label">Description</label>
    <textarea className="form-control" placeholder="Description"  name="description" value={description} onChange={ onchangeHandler}></textarea>
  </div>

  <div className="mb-3">
    <label className="form-label">Price</label>
    <input type="text" className="form-control" placeholder="Price" name="price" value={price} onChange={ onchangeHandler}/>
  </div>

  <button type="submit" className="btn btn-primary w-100">Submit</button>
</form>

        </div>
    )
 }
 export default EditOrAddProduct;