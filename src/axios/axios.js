import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api', // Change to your backend URL
  baseURL: 'https://eventwebsite-server.onrender.com/api', // Change to your backend URL

  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;