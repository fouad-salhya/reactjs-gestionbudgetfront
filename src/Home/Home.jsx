import React, { useEffect, useState } from 'react'
import './Home.css'
import Sidebar from '../Sidebar/Sidebar'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskSpecifiqueJour, deleteTask } from '../features/tasks/taskSlice';
import { getMyAccount } from '../features/accounts/accountSlice';
import { getAllMyTask } from '../features/tasks/taskSlice';
import { api_tasks } from '../Api/Api';
import { isAuthenticated } from '../Helpers/authenticated';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

   const dispatch = useDispatch()
 
   const taskJour = useSelector((state) => state.tasks.tasks)
   const account = useSelector((state) => state.accounts.account)
   const myTasks = useSelector((state) => state.tasks.myTasks)

   const navigate = useNavigate()

   const { token } = isAuthenticated()
     
  // state show form
  const [statusFormTask, setStatusFormTask] = useState(false)

  const showFormTask = () => setStatusFormTask(true)
  const hideFormTask = () => setStatusFormTask((false))

//  state de la date
  const [date, setDate] = useState(new Date());
  const onChange = (date) => setDate(date)

// state pour creer un task 
   const [ task, setTask ] = useState({
    name:'',
    cost: null
   })   

  const monthlyAmount = () => {
     return account?.salaire;
  }

  const totalCostJour = () => {
     return taskJour?.reduce((total, task) => total + parseFloat(task.cost), 0)
  }
  const totalTasksJour = () => {
    return taskJour?.length
 }

  const totalCostAllTask = () => {
     return myTasks?.reduce((total, myTask) => total + parseFloat(myTask.cost), 0)
 }

  const remainingAmount = () => {

     const total =  ( monthlyAmount() - totalCostAllTask() )
     return total
  }

  const handleChange = (e) => {
    setTask({...task,[e.target.id]: e.target.value})
  }

  const createTask = () => {

     axios.post(`${api_tasks}/create`,task, {
      headers: {
         'Content-Type': `application/json`,
         'Authorization': `Bearer ${token}`
      }
     }).then((res) => {
         console.log(res)
     })
       .catch((err) => console.error(err))
  }

  useEffect(() => {
     dispatch(getTaskSpecifiqueJour(date.toISOString()))
  
  },[taskJour])

  useEffect(() => {
    dispatch(getMyAccount())
    dispatch(getAllMyTask())
  },[])
  

  return (
   <div className="container-fluid">
   <div className="row">
        <div className="col-sm-2">
           <Sidebar />
        </div>
        <div className="col-sm-10">
           <div className="row">
              <div className="col-sm-3">
                      <div className="card bg-vert dashbord">
                        <div className="card-dashbord">
                          <h4 className="h4-salaire-account">Monthly Amount</h4>
                          <h5 className="h5-amount">
                            <span id='span-salaire'>{monthlyAmount()} $</span>
                          </h5>
                          <i className="fa fa-smile-o" id="fa-smile-o" aria-hidden="true"></i>
                       </div>
                     </div>
              </div>
              <div className="col-sm-3">
                <div className="card bg-bleu dashbord">
                        <div className="card-dashbord">
                          <h4 className="h4-salaire-account">Remaining Amount</h4>
                          <h5 className="h5-amount">
                            <span id='span-salaire'>{remainingAmount()} $</span>
                          </h5>
                          <i className="fa fa-smile-o" id="fa-smile-o" aria-hidden="true"></i>
                       </div>
                     </div>
              </div>
              <div className="col-sm-6">
                  <div className='add-task'>
                    {!statusFormTask && (
                      <i onClick={() => showFormTask()} className="fa fa-pencil-square-o" id='fa-pencil-task' aria-hidden="true"></i>
                     )}
                     {statusFormTask && (
                       <i onClick={() => hideFormTask()} className="fa fa-trash-o" aria-hidden="true" id='fa-trash-task-form'></i>
                     )}
                      {statusFormTask && (
                         <div className='form-add-task'>
                         <form  className='form-task'>
                          <div className='form-flex-task'>
                            <div>
                            <label htmlFor="name"  className='form-label text-muted'> 
                                   Task 
                            </label>
                           <input 
                                 type="text" 
                                 className="form-control" 
                                 id='name' 
                                 onChange={handleChange}
                           />
                            </div>
                            <div>
                            <label htmlFor='cost' className='form-label text-muted' id='label-cost-task'> 
                                   Price 
                            </label>
                             <input 
                                  type='number'
                                  className='form-control' 
                                  id='cost' 
                                  onChange={handleChange}
                           />
                            </div>
                           </div>
                           <button onClick={() => createTask()} className='btn btn-warning btn-add-task'>Add</button>   
                           {JSON.stringify(task)}
                          </form>
                        </div> 
                      )}
                  </div>
              </div>
           </div>
           <div className="row">
            <div className="col-sm-3">
               <Calendar 
                   onClickDay={() => getTaskSpecifiqueJour()}
                   className='calendar-dashbord'
                   onChange={onChange} 
                   value={date}
               />
            </div>
            <div className="col-sm-9">
                <div className='list-task-jour'>
                   <div className="row">
                   <h5 className='list-task-jour'>Liste Tasks {moment(date).format('L')}</h5>
                    <div className="col-sm-7">
                   <ul className='list-task-jour'>
                     {taskJour && taskJour.map((taskJour,i) => (
                        <li key={i}>
                        <p>
                         <strong className='list-task-jour'>{taskJour.name} </strong>
                         <span className='cost-list-task-jour'>
                            {taskJour.cost}$ 
                            <i onClick={() => dispatch(deleteTask(taskJour.id))} className="fa fa-trash" id='list-task-jour' aria-hidden="true"></i>
                         </span>
                        </p>
                        </li>
                     ))}
                   
                   </ul> 
                    </div>
                    <div className="col-sm-4">
                       <div className='calcul-total-cost'> 
                           <div>
                             <h5>Total Price: </h5>
                             <span className='calcul-total-cost'>{totalCostJour()}$</span>
                            </div>
                            <hr />
                            <div>
                             <h5>Total Task: </h5>
                             <span className='calcul-total-cost'>{totalTasksJour()}</span>
                            </div>
                       </div>
                    </div>
                   </div>
                </div>
            </div>
           </div>
        </div>
   </div>
</div>

  )
}

export default Home