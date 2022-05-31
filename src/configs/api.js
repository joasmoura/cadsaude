import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-teste-front-end-fc.herokuapp.com', //url base da sua api
});

export default api