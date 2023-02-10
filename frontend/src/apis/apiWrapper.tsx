import axios from 'axios';

export default axios.create({
  baseURL: process.env.BE_API + '/api/v1',
  withCredentials: true,
});
