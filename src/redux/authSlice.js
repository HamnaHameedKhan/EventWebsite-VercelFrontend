import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {},
    users: [], // New field for storing all users
    loading: true,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        registerFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        loginFailed: (state, action) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.loading = false;
            localStorage.removeItem('token')
        },
        setLoading: (state, action) => {
            state.loading = action.payload

        },
        getUsers: (state, action) => {
            state.users = action.payload;
            state.isAuthenticated=true;
        },
        editUserRequest: (state) => {
            state.loading = true;
        },
        editUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.user.id = action.payload._id;
        },
        editUserFailure: (state,action) => {
            state.loading = false;
            state.error=action.payload
        },


    }

})

export const { registerSuccess, registerFailed, loginSuccess, loginFailed, logout, setLoading, getUsers,
    editUserRequest, editUserSuccess, editUserFailure
} = authSlice.actions;
export default authSlice.reducer;