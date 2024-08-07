import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import Logout from './component/Logout'
import Reg from './component/Reg'
import Nav from './component/Nav'
import Addprod from './component/Addprod'

import Ct from './component/Ct'
import './App.css'
import Cart from './component/Cart'
import Editprod from './component/Editprod'
import Km from './component/Km'

const App = () => {
  let [data,setData]=useState({"token":"","_id":"","name":"","role":"","noofitems":0})
  let fun=(obj)=>{
    setData({...data,...obj})
  }
  let obj={"data":data,"fun":fun}
  return (
    <div>
      <BrowserRouter>
      <Ct.Provider value={obj}>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/reg' element={<Reg/>}/>
        <Route path='/addprod' element={<Addprod/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/editprod' element={<Editprod/>}/>
        <Route path='/km' element={<Km/>}/>
      </Routes>
      </Ct.Provider>
      </BrowserRouter>
      
    </div>
  )
}

export default App;

