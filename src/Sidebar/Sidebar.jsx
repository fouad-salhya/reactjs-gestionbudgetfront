import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'



const Sidebar = () => {

  return (
            <section className="sidebar">
             <Link to="/" id='sidebar-link'> Dashbord </Link>
             <Link to="/statistic" id='sidebar-link'> Statistics </Link>
             <Link to="/account" id='sidebar-link'> Account </Link>
             <Link to="" id='sidebar-link'> Settings </Link>
             <Link to="" id='sidebar-link'> Logout </Link>
           </section>
  )
}

export default Sidebar