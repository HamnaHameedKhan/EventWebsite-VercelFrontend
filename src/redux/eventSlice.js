import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
  success: false,
  events: [],
  singleEvent: [ ],
  isEditing: false,
  editEventId: null,
  formData: {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    image: null,
  },
  selectedEvent:null,
  searchedEvents:[]
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    createEventSuccess: (state, action) => {
      state.events = action.payload;
      state.error = null;
      state.loading = false;
      state.success = true;
    },
    createEventFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    createEventRequest: (state) => {
      state.error = null;
      state.loading = true;
    },
    resetEvent: (state) => {
      state.events = [];
      state.error = null;
      state.loading = false;
      state.success = false;
    },
    getEvent: (state, action) => {
      state.events = action.payload;
      state.error = null;
      state.success = true;
    },
    deleteEventStart: (state) => {
      state.loading = true;
    },
    deleteEventSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.events = state.events.filter(event => event._id !== action.payload);
    },
    deleteEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    editEventRequest:(state)=>{
        state.loading = true;

    },
    editEventSuccess:(state,action)=>{
        state.loading=false;
        state.success=true;
        state.events=state.events.map(event=>event._id !== action.payload._id ? action.payload:event);

    },
    editEventFailure:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    },
    setEditForm: (state, action) => {
      state.isEditing = true;
      state.editEventId = action.payload._id;
      state.formData = {
        title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
        time: action.payload.time || '00:00',
        location: action.payload.location,
        price: action.payload.price,
        image: action.payload.image,
      };
    },
    resetForm: (state) => {
      state.isEditing = false;
      state.editEventId = null;
      state.formData = {
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: '',
        image: '',
      }
    },
    getSingleEvent:(state,action)=>{
      state.singleEvent=action.payload;
      state.loading=false;
    },
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    searchEventSuccess: (state, action) => {
      state.loading = false;
      state.searchedEvents = action.payload;
    },
  }
});

export const {
  createEventSuccess,
  createEventFailure,
  createEventRequest,
  resetEvent,
  getEvent,
  deleteEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  editEventRequest,
  editEventFailure,
  editEventSuccess,
  setEditForm,
  resetForm,
  getSingleEvent,
  selectEvent,
  clearSelectedEvent,
  searchEventSuccess
} = eventSlice.actions;

export default eventSlice.reducer;
