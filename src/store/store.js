import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import eventSlice from "../redux/eventSlice";
import bookingSlice from "../redux/bookingSlice";


export const store=configureStore({
    reducer:{
        auth:authReducer,
        event:eventSlice,
        bookings:bookingSlice
    }
})

export default store;