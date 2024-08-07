import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

const Login = () => {
  let [err,setErr]=useState("")
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let [data,setData]=useState({})
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let login=()=>{
    axios.post("http://localhost:5000/userlogin",data).then((res)=>{
    if(res.data.token==undefined) 
    {  
    setErr(res.data.msg)
    }
    else{
      obj.fun(res.data)
      navigate("/")
    }
    })
  }
  return (
    <div className='con'>
      <div className='form'>
        {err!=""&&<div>{err}</div>}
      <input type='text' placeholder='enter email' name="_id" onChange={fun}/>
      <input type='password' placeholder='enter pwd' name="pwd" onChange={fun}/>
      <button onClick={login}>add</button>
      </div>
    </div>
  )
}

export default Login
