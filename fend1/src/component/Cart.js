import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

const Cart = () => {
  let[cart,setCart]=useState([])
  let[f,setF]=useState(true)
  let[total,setTotal]=useState(0)
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    if(obj.data.token==""){
      navigate("/login")
    }
    else{
      axios.get(`http://localhost:5000/getcart/${obj.data._id}`).then((res)=>{
       setCart(res.data)
       let x=res.data
       obj.fun({"noofitems":x.length})
       let s=0
       for(let i=0;i<x.length;i++){
        s=s+x[i].qty*x[i].price
       }
       setTotal(s)
      })
    }
  },[f])
  let del=(cid)=>{
    axios.delete(`http://localhost:5000/delcart/${cid}`).then(()=>{
      setF(!f)
    })
  }
  let inc=(cid)=>{
    axios.get(`http://localhost:5000/inc/${cid}`).then(()=>{
      setF(!f)
    })
  }
  let dec=(cid,qty)=>{
    if(qty>1){
    axios.get(`http://localhost:5000/dec/${cid}`).then(()=>{
      setF(!f)
    
       })
    }else{
      del(cid)
    }
}
  return (<>
  {cart.length==0&&<div>your cart is empty</div>}
  {cart.length>0&&
    <div className='cont'>
      {
        cart.map((item)=>{
          return(<div className='prdcon'>
                <div className='img'>
                  <img src={`http://localhost:5000/pimages/${item.pimg}`}/>
                  </div>
                  <p>Name:{item.name}</p>
                  <p>Desc:{item.desc}</p>
                  <p>Cat:{item.cat}</p>
                  <p>Price:{item.price}</p>
                  <p>Total:{item.qty*item.price}</p>
                  <p><button onClick={()=>dec(item._id,item.qty)}>-</button>{item.qty}<button onClick={()=>inc(item._id)}>+</button></p>
                  <button onClick={()=>del(item._id)}>delete</button>

          </div>)
        })
      }
      <div>Carttotal:{total}</div>
    </div>}
    </> )
}

export default Cart;
