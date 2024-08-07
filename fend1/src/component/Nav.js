import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'


const Nav = () => {
    let obj=useContext(Ct)
  return (
    <nav>
      <Link to='/'>Home</Link>
     {obj.data.role=="admin"&&obj.data.token!=""&&<Link to='/addprod'>Addprod</Link>}
      {obj.data.token==""&&<Link to='/login'>Login</Link>}
      {obj.data.token!=""&&<Link to='/logout'>Logout</Link>}
     {obj.data.token==""&& <Link to='/reg'>Reg</Link>}
    { obj.data.token!=""&&<Link to='/cart'>Cart<button>{obj.data.noofitems}</button></Link> }
    { obj.data.token!=""&&<h3>{obj.data.name} {obj.data.role}</h3> }
    </nav>
  )
}

export default Nav
