import { useState } from 'react'
import blogService from '../services/blog'

const BlogsForm = ({ updateBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = (event) => {
    event.preventDefault()
    blogService.create({ title, author, url })
      .then(blog => {
        updateBlogs(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch(err => err)
  }

  return (
    <div>
      <form onSubmit={(event) => handleBlogCreation(event)}>
        <h2>Create New</h2>
                title: <input value={title} onChange={(event) => setTitle(event.target.value)}/>
        <br/>
                author: <input value={author} onChange={(event) => setAuthor(event.target.value)}/>
        <br/>
                url: <input value={url} onChange={(event) => setUrl(event.target.value)}/>
        <br/>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogsForm