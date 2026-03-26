import React from 'react'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate=useNavigate();
    const data=["Manage Users","Manage Orders","Manage Products"];
  return (
   <div className="d-flex justify-content-center align-items-center flex-wrap mt-5 gap-3">
  {data.map((item) => (
    <div onClick={()=>navigate(`/${item}`)}
      key={item}
      className="card text-center shadow-sm border-0"
      style={{ width: "300px",height:"100px", borderRadius: "10px", 
         transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
         backgroundColor:"white"
         }}
           
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
        e.currentTarget.style.backgroundColor = "#e7f1ff"; // light blue shade
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
        e.currentTarget.style.backgroundColor = "white";
      }}
    >
      <div className="card-body">
        <h5 className="card-title text-dark mb-0">{item}</h5>
      </div>
    </div>
  ))}
</div>

  )
}

export default Admin
