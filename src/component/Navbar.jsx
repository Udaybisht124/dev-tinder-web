import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Links, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((state)=> state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = async ()=>{

    try {
      const res = await axios.post("http://localhost:7000/logout",{},{withCredentials:true})
      dispatch(removeUser())
      return navigate("/login")
    } catch (err) {
      console.error(err)
      
    }
  }

  return (
    <div className="navbar bg-neutral">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">🧑‍💻devTinder</Link>
    </div>

{user && <div className="flex-none   gap-2">
  <p>welcome!!! {user.firstName}</p>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-8">
          <div className="w-10 rounded-full">
            <img
              alt="user profile"
              src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div> }

    
  </div>
  )
}

export default Navbar