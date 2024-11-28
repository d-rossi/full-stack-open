import axios from 'axios'

const BLOGS_URL = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => token = `Bearer ${newToken}`

const get = () => {
  return axios.get(BLOGS_URL, { headers: { Authorization: token } }).then(response => response.data)
}

const create = (blog) => {
  return axios.post(BLOGS_URL, blog, { headers: { Authorization: token } }).then(response => response.data)
}

const update = (blog) => {
  return axios.put(`${BLOGS_URL}/${blog.id}`, blog, { headers: { Authorization: token } }).then(response => response.data)
}

const deleteBlog = (blogId) => {
  return axios.delete(`${BLOGS_URL}/${blogId}`, { headers: { Authorization: token } }).then(response => response.data)
}

export default { get, create, update, deleteBlog, setToken }