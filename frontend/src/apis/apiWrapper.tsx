import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BE_API + '/api/v1',
  withCredentials: true,
});
