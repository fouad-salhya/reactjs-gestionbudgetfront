import React, { useState } from 'react'
import './Signup.css'
import { api_accounts, api_auth } from '../Api/Api'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {

  const navigate = useNavigate()

  const [ user, setUser ] = useState({
     name:'',
     profession:'',
     email:'',
     password:'',
     salaire: null,
     phone: null
  })
  
 
  
  const handleChange = (e) => {

     setUser({...user, [e.target.id]: e.target.value})
 };

  const signupForm = (e) => {

      fetch(`${api_auth}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify(user)
      }).then((res) => res.json())
        .then((res, error) => {
            if(error) {
              return alert(error)
            } else {
              alert(res.message)
              return navigate('/signin')
            }
        }).catch((err) => console.error(err.err))
  } 


  return (
   <div className="container ">
           <div className="col-sm-9 signup mx-auto">
           <h4 className='signup'> Signup Form </h4>
              <form onSubmit={() => signupForm()}>
                 <div className="row">
                    <div className="col-sm-6 mb-3">
                        <label htmlFor="name" className="form-label label-signup">Name</label>
                        <input 
                              onChange={handleChange} 
                              type="text" 
                              className="form-control" 
                              id="name" 
                              name='name'    
                          />
                    </div>
                    <div className="col-sm-6 mb-3">
                        <label htmlFor="profession" className="form-label label-signup">Profession</label>
                        <input 
                              onChange={handleChange} 
                              type="text" className="form-control" 
                              id="profession" 
                              name='profession' 
                        />
                    </div>
                  </div>
                  <div className="row">
                     <div className="col-sm-6 mb-3">
                        <label htmlFor="email" className="form-label label-signup">Email</label>
                        <input 
                               onChange={handleChange} 
                               type="email" 
                               className="form-control" 
                               id="email" 
                               name='email'
                        />
                     </div>
                     <div className="col-sm-6 mb-3">
                        <label htmlFor="phone" className="form-label label-signup">Phone</label>
                        <input 
                               onChange={handleChange} 
                               type="tel" 
                               className="form-control" 
                               id="phone" 
                               name='phone' 
                        />
                     </div>
                  </div>
                  <div className="row">
                    <div className="col ">
                        <label htmlFor="password" className="form-label label-signup">Password</label>
                        <input 
                               onChange={handleChange} 
                               type="password" 
                               className="form-control" 
                               id="password" 
                               name='password'
                        />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="salaire" className="form-label label-signup">Salaire</label>
                        <input 
                               onChange={handleChange} 
                               type="text" 
                               className="form-control" 
                               id="salaire" 
                               name='salaire' 
                        />
                    </div>
                  </div>
                
                 <div className="row mb-3 mt-4">
                     <div className="col-sm-6">
                          <button className='btn btn-primary' > Create Account </button>
                     </div>
                     <div className="col-sm-6">
                          <Link to='/signin'  className='redirect-signin'> vous avez deja un compte ? </Link>
                     </div>
                 </div>
              </form>
           </div>
   </div>
  )
}

export default Signup
