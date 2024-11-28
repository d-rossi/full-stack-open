import { useEffect, useState } from 'react'
import blogService from './services/blog'
import LoginForm from './components/loginForm'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

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
    setSuccessMessage('New blog successfully created!')
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
          <Togglable buttonLabelForShow="New Blog" buttonLabelForHide="Cancel">
            <BlogsForm updateBlogs={updateBlogs}/>
          </Togglable>
          {
            blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog => <Blog key={blog.id} blogToDisplay={blog} loggedInUsername={user.username} />)
          }
        </div>
      }
    </div>
  )
}

export default App
