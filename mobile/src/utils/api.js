import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com/',
  timeout: 5000, // optional timeout value
});

export default instance;
