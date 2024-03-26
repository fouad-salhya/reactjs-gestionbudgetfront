import React, { useState, useEffect } from 'react'
import './Statistic.css'
import Sidebar from '../Sidebar/Sidebar'
import { api_tasks } from '../Api/Api'
import { isAuthenticated } from '../Helpers/authenticated'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useDispatch, useSelector } from 'react-redux'
import { getAllMyTask } from '../features/tasks/taskSlice'



const Statistic = () => {

    const dispatch = useDispatch()
    
    const myTasks = useSelector((state) => state.tasks.myTasks)
    
    const { token } = isAuthenticated()

    // state de charts
    const [data, setData] = useState([])

    

    const calculTotalTasks = () => {
       return myTasks?.length
    } 

    const calculTotalCostTasks = () => {
       return myTasks?.reduce((total, mytask) => total + parseFloat(mytask.cost), 0)
    }

    const getTotalTaskCreatedPerDay = () => {

       fetch(`${api_tasks}/day/total`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then((res) => res.json())
          .then((res) => {     
              setData(res.result)
          })      
    }

    useEffect(() => {
      getTotalTaskCreatedPerDay()
    },[])

    useEffect(() => {
       dispatch(getAllMyTask())
    },[])
  
  
   
  return (
    <div className='container-fluid'>
       <div className="row">
       <div className="col-sm-2">
         <Sidebar />
      </div>
      <div className="col-sm-10">
         <div className='row'>
             <div className="col-sm-3">
             <div className="statistic-tasks">
               <div className="card-tasks">
                  <h4 className="statistics-tasks text-white">Total Tasks</h4>
                  <h5 className="statistics-tasks text-white">
                  <span id='span-statistics'> +{calculTotalTasks()}</span>
                  </h5>
              </div>
            </div>
             </div>

             <div className="col-sm-3">
             <div className="statistic-cost-total">
               <div className="card-cost-total">
                  <h4 className="statistics-const-total text-white">Price Total</h4>
                  <h5 className="statistics-const-total text-white">
                  <span id='span-cost-total'> +{calculTotalCostTasks()} $</span>
                  </h5>
              </div>
            </div>
             </div>

             <div className="col-sm-3">
             <div className="statistic-friends">
               <div className="card-friends">
                  <h4 className="statistics-friends text-white">Friends</h4>
                  <h5 className="statistics-friends text-white">
                  <span id='span-friends'> +200</span>
                  </h5>
              </div>
            </div>
             </div>

             <div className="col-sm-3">
             <div className="statistic-ranking">
               <div className="card-ranking">
                  <h4 className="statistics-ranking text-black">Rank</h4>
                  <h5 className="statistics-ranking text-black">
                  <span id='span-ranking'> <mark> #17</mark> </span>
                  </h5>
              </div>
            </div>
             </div>

             
         </div>

         <div className="row">
            <div className="col-sm-6">
             <div className="chart-total-task-jour">
             <LineChart width={440} height={270} data={data}>
              <XAxis dataKey="dateFinal"  
               />
              <YAxis 
                label={{ value: 'Nombre des task', angle: -90, position: 'insideLeft' }}
               
                />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#FF00FF" activeDot={{ r: 8 }} />
            </LineChart>
             </div>
            </div>

            <div className="col-sm-6">
              <div className="chart-total-cost-jour">
              <LineChart width={440} height={270} data={data}>
              <XAxis dataKey="dateFinal"  
               />
              <YAxis 
               label={{ value: 'Total Price', angle: -90, position: 'insideLeft' }}
                />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#0000ff" activeDot={{ r: 8 }} />
            </LineChart>
              </div>
            </div>
         </div>
      </div>
       </div>
    </div>
  )
}
export default Statistic