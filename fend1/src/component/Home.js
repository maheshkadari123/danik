import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    let[prd,setPrd]=useState([])
    let navigate=useNavigate()
    let[f,setF]=useState(true)
    let obj=useContext(Ct)
    useEffect(()=>{
          axios.get("http://localhost:5000/getprod").then((res)=>{
                setPrd(res.data)
          })
    },[f])
    let chndlr=(e)=>{
       axios.get(`http://localhost:5000/getprod/${e.target.value}`).then((res)=>{
        setPrd(res.data)
       })
    }
    let addcart=(item)=>{
      if(obj.data.token==""){
        navigate('/login')
      }
      else{
        let data={"pid":item._id,"name":item.name,"desc":item.desc,"price":item.price,"pimg":item.pimg,"cat":item.cat,"qty":1,"uid":obj.data._id}
        axios.post("http://localhost:5000/addcart",data).then(()=>{
          navigate('/cart')
        })

      }
    }
    let del=(pid,pimg)=>{
        axios.delete(`http://localhost:5000/delproduct/${pid}/${pimg}`).then(()=>{
          setF(!f)
        })
    }
    let edit=(item)=>{
      obj.fun({"item":item})
      navigate('/editprod')
    }
    let km=(item)=>{
      obj.fun({"item":item})
      navigate('/km')
    }
    
  return (
    <div className='cont'>
         <div className='schbr'> <select onChange={chndlr}>
            <option selected disabled>select filter category</option>
             <option value="electronics">laptop</option>
             <option value="mobiles">mobiles</option>
             <option value="collection for men">shirt</option>
             <option value="">clearfilter</option>
          </select></div>
           { prd.map((item)=>{
                return(<div className='prdcon'>
                          <div className='img'>
                         <img src={`http://localhost:5000/pimages/${item.pimg}`}/></div>
                         <p>Name:{item.name}</p>
                         <p>desc:{item.desc}</p>
                         <p>price:{item.price}</p>
                         <p>Cat:{item.cat}</p>
                         <button onClick={()=>addcart(item)}>Addcart</button>
                         <button onClick={()=>km(item)}>Know more</button>
                         {obj.data.role=="admin"&&<button onClick={()=>edit(item)} >Edit item</button>}
                         {obj.data.role=="admin"&&<button onClick={()=>del(item._id,item.pimg)}>Delete item</button>}
                    </div>)
            })
        }
      
    </div>
  )
}

export default Home
