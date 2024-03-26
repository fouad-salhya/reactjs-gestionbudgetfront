import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_accounts } from "../../Api/Api"; 
import { isAuthenticated } from "../../Helpers/authenticated";


const { token } = isAuthenticated()

 export const getMyAccount = createAsyncThunk('accounts/getMyAccount', async () => {

     const response = await fetch(`${api_accounts}/account`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     })

     const data = await response.json()
     
     return data
})


const initialState = {
    account: {},
    status: '',
    error: ''
}

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
         .addCase(getMyAccount.rejected, (state, action) => {
            state.state = 'failed'
            state.error = action.payload.error

         })
         .addCase(getMyAccount.pending, (state) => {
             state.status = 'loading'
         })
         .addCase(getMyAccount.fulfilled, (state, action) => {
             state.status = 'succeeded'
             state.account = action.payload.account
        })
        
    }
})

export default accountsSlice.reducer;