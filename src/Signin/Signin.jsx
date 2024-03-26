import React, { useState } from 'react'
import './Signin.css'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api_auth } from '../Api/Api'


const Signin = () => {

  const navigate = useNavigate()

  const [ user, setUser ] = useState({
    email:'',
    password:''
  })

  const [errors, setErrors] = useState({});
  
  
  const schema = Yup.object().shape({
    password: Yup.string().required("Mot de passe est requis").min(6,"minimum 6"),
    email: Yup.string().email('ne respect pas la format email').required('email is required'),
   });

   const handleChange = (event) => {

    const { name, value } = event.target;
     Yup.reach(schema, name)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
      });
 
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
   
    event.preventDefault();
 
    schema
      .validate(user, { abortEarly: false })
      .then(() => {
         fetch(`${api_auth}/signin`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, body: JSON.stringify(user)
         }).then((res) => res.json())
           .then((res) => {
              if(res.error) {
                return alert(res.error)
              }

                 localStorage.setItem('JWT',JSON.stringify(res))
                return navigate('/')  
           })
      })
      .catch((err) => {
        setErrors(
          err.inner.reduce((acc, error) => {
            return { ...acc, [error.path]: error.message };
          }, {})
        );
      });
  };
  
    
  return (
    <div className='container'>
      <div className="row">
         <div className="col-sm-5 mx-auto form-signin">
            <h4 className='signin'> Signin Form </h4>
             <form onSubmit={handleSubmit}>
               <div className="form-group mb-2">
                <label htmlFor="email" className="form-label label-signin">Email</label>
                <input 
                     onChange={handleChange} 
                     type="text" 
                     className="form-control" 
                     id="email" 
                     name='email'
                 />
                {errors.email && <div className="error text-danger">{errors.email}</div>}
                </div>
                <div className="form-group mb-3">
                <label htmlFor="password" className="form-label label-signin">Password</label>
                <input 
                      onChange={handleChange} 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      name='password'
                />
                {errors.password && <div className="error text-danger">{errors.password}</div>}
                </div>
                 <div className="row mt-1">
                  <div className="col">
                    <button className='btn btn-primary'> Connexion </button>
                  </div>
                  <div className="col">
                     <Link to="/signup" className='redirect-signup'> create account! </Link>
                  </div>
                 </div>
             </form>
         </div>
      </div>
    </div>
  )
}

export default Signin