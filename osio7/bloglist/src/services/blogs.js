import axios from 'axios'
const baseUrl = '/api/blogs'
const commentUrl = '/api/comments'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getBlog = async (id) => {
  const request = axios.get(`${ baseUrl }/${id}`)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blog) => {
  const newObject = { ...blog, likes: blog.likes +1 }
  delete newObject.user
  delete newObject.comments
  const request = await axios.put(`${ baseUrl }/${blog.id}`, newObject)
  return request.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}
const createComment = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(commentUrl, newObject, config)
  return response.data
}
export default { getAll, create, update, setToken, removeBlog, getBlog, createComment }