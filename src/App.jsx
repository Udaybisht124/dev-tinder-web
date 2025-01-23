
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Body from './component/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import Signup from './component/Signup'
import store from './utils/store'
import { Provider } from 'react-redux'
function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter basename='/'>
        <Routes>
    <Route path='/' element={<Body/>}>
    <Route path='/login' element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
