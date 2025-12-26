// redux/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    location: '',
    eventType: '',
    date: '',
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setEventType: (state, action) => {
      state.eventType = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    fetchEventsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action) => {
      state.events = action.payload;
      state.loading = false;
    },
    fetchEventsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setSearchTerm,
  setLocation,
  setEventType,
  setDate,
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
} = searchSlice.actions;

export default searchSlice.reducer;
