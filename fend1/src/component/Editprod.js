import React, { useContext, useState } from 'react'
import Ct from './Ct'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Editprod = () => {
    let obj=useContext(Ct)
    let navigate=useNavigate()
    let[data,setData]=useState(obj.data.item)
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let fun1=(e)=>{
       
    }
    let update=()=>{
       axios.put("http://localhost:5000/updprod",data).then(()=>{
        navigate('/')
       })
       
    }
  return (
    <div>
      <input type='text' placeholder='Enter name' name='name'  value={data.name} onChange={fun}/>
      <input type='text' placeholder='Enter desc' name='desc'  value={data.desc} onChange={fun}/>
      <input type='text' placeholder='Enter price' name='price'  value={data.price} onChange={fun}/>
      <input type='text' placeholder='Enter category' name='cat'  value={data.cat} onChange={fun}/>
      <input type='file' name='pimg' onChange={fun1}/>
      <button onClick={update}>updateprod</button> 
    </div>
  )
}

export default Editprod
