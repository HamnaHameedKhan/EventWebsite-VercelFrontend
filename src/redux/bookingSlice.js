import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookings: [],
    loading: false,
    error: null,
    success: false,
    userBookings:[]
}

const bookingSlice = createSlice({
    name: "bookings",
    initialState: initialState,
    reducers: {
        bookingRequest: (state, action) => {
            state.loading = true
            state.error = null
            state.success = false
        },
        bookingSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.success = true
            state.bookings = action.payload
        },
        bookingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;

        },
        fetchAllBookingsRequest: (state) => {
            state.loading = true;
            state.error = null;
          },
          fetchAllBookingsSuccess: (state, action) => {
            state.loading = false;
            state.bookings = action.payload;
          },
          fetchAllBookingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          fetchUserBookingsRequest: (state) => {
            state.loading = true;
            state.error = null;
          },
          fetchUserBookingsSuccess: (state, action) => {
            state.loading = false;
            state.userBookings = action.payload;
          },
          fetchUserBookingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
    }
})

export const {bookingRequest,bookingSuccess,bookingFailure,fetchAllBookingsFailure,fetchAllBookingsRequest,fetchAllBookingsSuccess,fetchUserBookingsFailure,fetchUserBookingsRequest,fetchUserBookingsSuccess}=bookingSlice.actions;
export default bookingSlice.reducer;