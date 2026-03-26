import { useEffect, useState } from "react"
import { getProducts } from "../api/productApi";
import { useNavigate } from "react-router-dom";
const Home=()=>{
const [data,setData]=useState([]);
 const Navigate=useNavigate();
useEffect(()=>{
    
   const fetchProducts=async()=>{
      try{
        const response=await getProducts()
        setData(response.data)
      }
      catch(err){
         console.log(err)
      }
   }
 fetchProducts();
},[])
    return (
  <div className="container-fluid px-5">
    <div className="row g-3">
      {data.map(item => (
        <div
          className="col-md-3"
          key={item.id}
          onClick={() => Navigate(`/product/${item.id}`)}
        >
          <div className="card h-100 d-flex flex-column" style={{ width: "100%" }}>
            <img className="card-img-top" src={item.imageUrl} height="150" />
            <div className="card-body mt-auto">
              <h5>{item.name}</h5>
              <h6>Price : ₹{item.price}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


   
}
 export default Home; 