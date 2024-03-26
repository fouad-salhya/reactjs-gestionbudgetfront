import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {



  return (

    <nav className='navbar'>
      <div>
      <h3 className='navbar-brand text-white'>
          <Link to='/' className='text-white brand-name nav-link'>
             <span className="span-brand-name">
               Save Budget 
             </span>
           </Link>
      </h3>
      </div>
      <Link to="/signup" className='nav-item nav-link text-white icon-login'>
         <span className='span-icon-login'>
          Registre
         </span>
          <i className="fa fa-sign-in " id="fa-icon-login" aria-hidden="true"></i>
      </Link>
    </nav>
  )
}

export default Navbar