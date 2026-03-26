import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
 import { FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { useState ,useEffect} from 'react';
import { MagnifyingGlass } from "phosphor-react";
import { IconSearch,IconUser,IconHeart,IconShoppingBag } from '@tabler/icons-react';
import { getCart } from '../api/cartApi';
const MyNavbar = ({auth,setAuth}) => {
  const navigate=useNavigate();
  const [role,setRole]=useState("");
  const[cartItems,setCartItems]=useState();
  useEffect(()=>{
    if(auth){
      setRole(localStorage.getItem("role"))
 
      console.log(role)
    } 
     
  })
  
 

  useEffect(()=>{
      
     console.log(role)
    if(role ==="CUSTOMER"){
         const fetchCart=async ()=>{
                try{
                  const response= await getCart() ;
                  console.log(response.data)
                  if(JSON.stringify( cartItems)!== JSON.stringify(response.data.items)){
                  
                   const totalItems=response.data.items.length;
           setCartItems(totalItems)
                   console.log(response.data.items)
                }}
                catch(err){
                  console.log(err)
                }
              }
              fetchCart()
             
        
    }
  },[cartItems,role])
   useEffect(() => {
    const handleStorageChange = () => {
      setAuth(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
   
  console.log(auth)
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://th.bing.com/th/id/R.6f232938ac209f25b48df39f3db1533a?rik=1epibyhbn2gOPw&riu=http%3a%2f%2fwww.dafont.com%2fforum%2fattach%2forig%2f2%2f4%2f24898.gif&ehk=kuRTwmT10QWY9IXB4QPWFqWiDjM3R6BsaaBFQR6ltS8%3d&risl=&pid=ImgRaw&r=0" // replace with your logo
            height="40"
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Hamburger toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/ladies">LADIES</Nav.Link>
            <Nav.Link as={Link} to="/men">MEN</Nav.Link>
            <Nav.Link as={Link} to="/kids">KIDS</Nav.Link>
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            {role==='ADMIN'?<Nav.Link as={Link} to="/admin" >ADMIN</Nav.Link>:null}
          </Nav>

          {/* Right side icons */}
          <Nav className="ms-auto">
            {auth ?
            null 
             :<button className='btn btn-dark btn-sm m-2' onClick={()=>navigate("/login")}>login</button>}
            <Nav.Link as={Link} to="/search" className='ms-2'><IconSearch stroke={1} /></Nav.Link>

            <Nav.Link as={Link} to="/profile"  className='ms-2'><IconUser stroke={1}  />
</Nav.Link>
            {role===""||role!=="ADMIN"?<>
            <Nav.Link as={Link} to="/wishlist"  className='ms-2'> <IconHeart stroke={1} /></Nav.Link>
            <Nav.Link as={Link} to="/cart"  className='ms-2'>  <IconShoppingBag stroke={1} />{ <span className=' fw-semibold '>{cartItems}</span>}</Nav.Link>
            </>:null}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
