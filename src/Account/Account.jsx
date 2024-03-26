import React, { useState, useEffect } from 'react'
import './Account.css'
import { isAuthenticated } from '../Helpers/authenticated'
import { api_accounts, api_users } from '../Api/Api'
import Sidebar from '../Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getMyAccount } from '../features/accounts/accountSlice'

const Account = () => {
  
    const dispatch = useDispatch()
    
    const account = useSelector((state) => state.accounts.account)

    const { token } = isAuthenticated()

    const { showForm, setShowForm } = useState(false)

    const showFormUpdate = () => {
       return setShowForm(true)
    }

  
    useEffect(() => {

      dispatch(getMyAccount())
    },[])

  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-sm-2">
              <Sidebar />
            </div>
            <div className="col-sm-10">
                 <div className="row">
                    <div className="col-sm-4">
                        <div className="card-account">
                            <i onClick={() => showFormUpdate()} className="fa fa-pencil text-warning" aria-hidden="true" id='fa-pencil-account'></i>
                            <h4> Personnel Informations </h4>
                            <div className="panel-body">
                               <p className="text-muted font-13">
                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. I
                                 n voluptatum nihil iusto dolor quis perspiciatis doloremque omnis suscipit. 
                                 Minus accusantium similique hic? Tenetur sit aliqua
                                 m magni nesciunt mollitia quibusdam qui!
                               </p>
                             <hr />
                              <div className="text-left">
                                 <p className="text-muted font-13">
                                   <strong>Full Name :</strong> 
                                    <span className="m-l-15">{account.name}</span>
                                 </p>
                                 <p className="text-muted font-13">
                                   <strong>Mobile :</strong>
                                   <span className="m-l-15">{account.phone}</span>
                                 </p>
                                 <p className="text-muted font-13">
                                   <strong>Email :</strong> 
                                   <span className="m-l-15">{account.email}</span>
                                 </p>
                                 <p className="text-muted font-13">
                                   <strong>Location :</strong>
                                   <span className="m-l-15">{account.country}</span>
                                 </p>
                                 <p className="text-muted font-13">
                                   <strong>Profession :</strong> 
                                   <span className="m-l-15">{account.profession}</span>
                                 </p>
                              </div>
                             </div>
                        </div>
                    </div>
                   <div className="col-sm-6">
                      {!account?.about && (
                          <div className='card-about-you'>
                          <div className='about-you'>
                             <h4 className='h4-about-you'> Tel Some info about you </h4>
                               <form>
                                 <textarea 
                                   name="about" 
                                   id="about" 
                                   cols="30" 
                                   rows="5" 
                                   className='form-control'
                                   >
                                 </textarea> 
                                  <br />
                                 <button className='btn btn-success' id='btn-about-you'>Add</button>
                                </form>
                          </div>
                       </div>
                      )}
                      {!showForm && (
                          
                      <div className="card-form-update">
                      <div className="form-update">
                         <form>
                             <div className="row">
                                <div className="col mb-2">
                                   <label htmlFor="name">Name</label>
                                   <input type="text" name="name" id="name" className='form-control' />
                                </div>
                                <div className="col mb-2">
                                   <label htmlFor="email">Email</label>
                                   <input type="email" name="email" id="email" className='form-control' />
                                </div>
                             </div>
                             <div className="row">
                                <div className="col mb-2">
                                   <label htmlFor="profession">Profession</label>
                                   <input type="text" name="profession" id="profession" className='form-control' />
                                </div>
                                <div className="col mb-2">
                                   <label htmlFor="salaire">Salaire</label>
                                   <input type="text" name="salaire" id="salaire" className='form-control' />
                                </div>
                             </div>
                             <div className="row">
                                <div className="col">
                                   <label htmlFor="phone">Phone</label>
                                   <input type="text" name="phone" id="phone" className='form-control' />
                                </div>
                                <div className="col">
                                   <button className='btn btn-success' id='btn-update-account'> Update </button>
                                </div>
                             </div>
                         </form>
                      </div>
                  </div>
                      )}
                   </div>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Account