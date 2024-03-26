import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './features/tasks/taskSlice'
import accountsReducer from './features/accounts/accountSlice'

export const store = configureStore({
    reducer: {
      tasks: tasksReducer,
      accounts: accountsReducer
    },

  })