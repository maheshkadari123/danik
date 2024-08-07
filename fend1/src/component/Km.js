import React, { useContext, useState } from 'react'
import Ct from './Ct'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Km = () => {
    let obj=useContext(Ct)
    let[text,setText]=useState("")
    let[item,setItem]=useState(obj.data.item)
    let fun=(e)=>{
        setText(e.target.value)
    }
    let add=()=>{
        axios.put("http://localhost:5000/addcom",{"pid":item._id,"name":obj.data.name,"text":text}).then(()=>{
             setText("")
            axios.get(`http://localhost:5000/getprdbyid/${item._id}`).then((res)=>{
                setItem(res.data)
            })
        })

    }
  return (
    <div className='cont'>
            <div className='prdcon'>
               <div className='img'>
                <img src={`http://localhost:5000/pimages/${item.pimg}`}/>
                </div> 
                <p>Name:{item.name}</p>
                <p>Desc:{item.desc}</p>
                <p>Price:{item.price}</p>
                <p>cat:{item.cat}</p>
            </div>
            {
                item.comm.map((cm)=>{
                    return(<div>
                        <p>Name:{cm.name}</p>
                        <p>commdetails:{cm.text}</p>
                        </div>)
                })
            }
            {
                obj.data.token!=""&&<div>
                    <textarea onChange={fun} value={text}></textarea>
                    <button onClick={add}>addcom</button>
                    </div>
            }
            <button><Link to='/'>Home</Link></button>
      
    </div>
  )
}

export default Km
