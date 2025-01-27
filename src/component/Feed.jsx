import React, { useEffect } from 'react'
import UserCard from "../component/Usercard";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import BASE_URL from '../utils/constant'
import store from '../utils/store';
const Feed = () => {
const feed = useSelector((store)=> store.feed)
  const dispatch = useDispatch();

const Fetchfeed = async () =>{

try {
 
  const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});


  dispatch(addFeed(res?.data?.data));
} catch (error) {
  console.error(error)
}



}

useEffect(()=>{
Fetchfeed()
},[])
 
  return (
   feed && (
      <div className="flex justify-center my-10">
  <UserCard user={feed[0]} />
      </div>
    ))
}

export default Feed