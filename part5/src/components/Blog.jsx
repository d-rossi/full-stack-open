import { useState } from 'react'
import blogService from '../services/blog'

const Blog = ({ blogToDisplay, loggedInUsername }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)
  const [blog, setBlog] = useState(blogToDisplay)

  const updatedBlog = (updatedBlog) => {
    const payload = { ...updatedBlog, likes: updatedBlog.likes+1, user: updatedBlog.user.id }
    blogService.update(payload).then(blog => setBlog(blog))
  }

  const deleteBlog = (blogId) => {
    if (!window.confirm('Are you sure you want to remove the blog?')) return
    blogService.deleteBlog(blogId).then(() => setBlog(null))
  }

  return (
    blog === null ?
      null :
      <div style={blogStyle}>
        {blog.title} by {blog.author} <button data-testid='detailsBtn' onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'View'}</button>
        {showDetails &&
                <div data-testid='details'>
                  {blog.url}
                  <br/>
                    Likes {blog.likes} <button data-testid='likesBtn' onClick={() => updatedBlog(blog)}>Like</button>
                  <br/>
                  {blog.user.name}
                  <br/>
                  {loggedInUsername === blog.user.username && <button onClick={() => deleteBlog(blog.id)}>Remove</button>}
                </div>
        }
      </div>
  )
}

export default Blog