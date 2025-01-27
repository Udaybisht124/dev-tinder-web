import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice'

const body = () => {

  

const dispatch = useDispatch();
const navigate = useNavigate();    
const userData = useSelector((state)=> state.user);
const fetchUser  = async() =>{

if(userData){}

  try {
    
    const res = await axios.get("http://localhost:7000/profile/view",{withCredentials:true})
    
    dispatch(addUser(res.data));

  } catch (err) {
    if(err.status === 401){
      navigate("/login")
    }
    console.error(err)
  }
}

useEffect(()=>{
  fetchUser();
},[]);




  return (
<>
<Navbar/>
<Outlet/>
<Footer/>
</>


)
}

export default body