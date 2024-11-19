import { useEffect, useState } from 'react'
import blogService from './services/blog'
import LoginForm from './components/loginForm'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState('')

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleUserLogin = (user) => {
    setUser(user)
    blogService.setToken(user.token)
  }

  const updateBlogs = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
    setSuccessMessage("New blog successfully created!")
    setTimeout(() => setSuccessMessage(''), 5000)
  }

  useEffect(() => {
    const userInLocalStorage = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (userInLocalStorage) {
      setUser(userInLocalStorage)
      blogService.setToken(userInLocalStorage.token)
    }
  }, [])

  useEffect(() => {
    blogService.get()
    .then(blogs => setBlogs(blogs))
    .catch(err => err)
  }, [user])
  
  return (
    <div>
      {user === null ?
        <LoginForm handleUser={handleUserLogin}/>
        :
        <div>
          {successMessage && <Notification type={'success'} message={successMessage} />}
          <h2>Blogs</h2>
          <div>
          {user.username} logged in
          <button onClick={() => handleLogout()}>Logout</button>
          </div>
          <BlogsForm updateBlogs={updateBlogs}/>
          <ul>
            {
              blogs.map(blog => <li key={blog.id}>{blog.title} by {blog.author}</li>)
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default App
