import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_tasks } from "../../Api/Api";
import { isAuthenticated } from "../../Helpers/authenticated";


const { token } = isAuthenticated()

export const getTaskSpecifiqueJour = createAsyncThunk('tasks/specifiqueTaskJOur', async (query) => {

     const response = await fetch(`${api_tasks}/specifique?date=${query}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })

     const data = response.json()
     return data
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) =>  {

     await fetch(`${api_tasks}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })
     return id
})


export const getAllMyTask = createAsyncThunk('tasks/getAllMyTasks', async () => {

    const response = await fetch(`${api_tasks}/all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const data =  response.json()

    return data
})



const initialState = {
    myTasks: [],
    tasks: [],
    status: '',
    error:''
}


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getTaskSpecifiqueJour.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
     })
      .addCase(getTaskSpecifiqueJour.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(getTaskSpecifiqueJour.fulfilled, (state, action) => {
         state.status = 'succeeded'
         state.tasks = action.payload.tasks
      })
      .addCase(deleteTask.fulfilled,(state, action) => {
         state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      })
      .addCase(getAllMyTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.error
      })
      .addCase(getAllMyTask.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(getAllMyTask.fulfilled, (state, action) => {
         state.status = 'succeeded'
         state.myTasks = action.payload.myTasks
      })
    }
})

export default tasksSlice.reducer