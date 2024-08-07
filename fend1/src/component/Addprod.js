import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Ct from './Ct' 
const Addprod = () => {
  let[data,setData]=useState({})
  let navigate=useNavigate()
  let obj=useContext(Ct)
  useEffect(()=>{
       if(obj.data.token=="" || obj.data.role!="admin"){
        navigate('/login')
       }
  },[])
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let fun1=(e)=>{
    setData({...data,"pimg":e.target.files[0]})
  }
  let add=()=>{
    let fd=new FormData()
    for(let i in data){
      fd.append(i,data[i])
    }
    axios.post("http://localhost:5000/addprod",fd).then(()=>{
       navigate('/')
    })
  }


  return (
    <div>
      <input type="text" placeholder='enter name' name="name" onChange={fun}/>
      <input type="text" placeholder='enter desc' name="desc" onChange={fun}/>
      <input type="text" placeholder='enter price' name="price" onChange={fun}/>
      <input type="text" placeholder='enter cat' name="cat" onChange={fun}/>
      <input type="file" name="pimg" onChange={fun1}/>
      <button onClick={add}>Addprod</button>

    </div>
  )
}

export default Addprod
