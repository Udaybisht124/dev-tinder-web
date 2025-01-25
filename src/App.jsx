
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Body from './component/Body'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import Feed from './component/Feed'
import Profile from './component/Profile'
import store from './utils/store'
import { Provider, useDispatch } from 'react-redux'
import axios from 'axios'
import { addUser } from './utils/userSlice'
function App() {
//as soon as the app is load i will fetch the data of user and send data to the store if 


  return (
    <>
    <Provider store={store}>
      <BrowserRouter basename='/'>
        <Routes>
    <Route path='/' element={<Body/>}>
    <Route path='/' element={<Feed/>}></Route>
    <Route path='/login' element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/profile" element={<Profile/>}/>
    </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
