import axios from 'axios'
const usersURl = '/api/users'

const getAll = () => {
  const request = axios.get(usersURl)
  return request.then(response => response.data)
}

const getUser = async (id) => {
  const request = axios.get(`${ usersURl }/${id}`)
  return request.then(response => response.data)
}

export default { getAll, getUser }