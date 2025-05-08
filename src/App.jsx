
import Body from './component/Body.jsx';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './component/Home.jsx';
import Login from './component/Login.jsx';
import Signup from './component/Signup.jsx';
import Feed from './component/Feed.jsx';
import Profile from './component/Profile.jsx';
import store from './utils/store.js';
import { Provider, useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from './utils/userSlice.js';
import Connection from './component/Connection.jsx';
import Request from './component/Request.jsx';
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
    <Route path="/connections" element={<Connection/>}/>
    <Route path="/requests" element={<Request/>}/>
    </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
