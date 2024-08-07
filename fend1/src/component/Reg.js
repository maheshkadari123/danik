import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Reg = () => {
  let[data,setData]=useState({})
  let[err,setErr]=useState("")
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let register=()=>{
    axios.post("http://localhost:5000/reguser",data).then((res)=>{
        if(res.data.err!=undefined)
          {
            setErr(res.data.msg)
          }
          else{
            navigate('/login')
          }
    })
  }
  return (
    <div className='con'>
      <div className='form'>
        {err!=""&&<div>{err}</div>}
        <input type='text' placeholder='Enter email' name="_id" value={data._id} onChange={fun}/>
        <input type='text' placeholder='Enter name' name="name" value={data.name} onChange={fun}/>
        <input type='password' placeholder='Enter pwd' name="pwd" value={data.pwd} onChange={fun}/>
        <input type='text' placeholder='Enter phno' name="phn" value={data.phn} onChange={fun}/>
        <button onClick={register}>Register</button>
      </div>
      
    </div>
  )
}

export default Reg
