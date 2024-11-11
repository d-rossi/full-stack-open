const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((acc, currentVal) => acc + currentVal.likes, 0)
  }

  const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => { return blog.likes > max.likes ? blog : max }, blogs[0])
  }

  const mostBlogs = (blogs) => {
    const authorToBlogCount = blogs.reduce((artistToBlogsCount, blog) => {
        console.log(artistToBlogsCount)
        const author = blog.author
        if (artistToBlogsCount[`${author}`] == null) artistToBlogsCount[`${author}`] = 0
        artistToBlogsCount[`${author}`]++
        return artistToBlogsCount
    }, {})

    let maxCount = 0
    let authorMostBlogs = ""
    for (const [author, count] of Object.entries(authorToBlogCount)) { 
        if (count > maxCount) { 
            maxCount = count 
            authorMostBlogs = author
        } 
    }
    
    return maxCount === 0 ? null : {author: authorMostBlogs, blogs: maxCount }
  }

  const mostLikes = (blogs) => {
    const authorToLikesCount = blogs.reduce((authorToLikes, blog) => {
        const author = blog.author
        if (authorToLikes[`${author}`] == null) authorToLikes[`${author}`] = 0
        authorToLikes[`${author}`] += blog.likes
        return authorToLikes
    }, {})

    let maxCount = 0
    let authorMostLikes = ""
    for (const [author, count] of Object.entries(authorToLikesCount)) { 
        if (count > maxCount) { 
            maxCount = count 
            authorMostLikes = author
        } 
    }
    
    return maxCount === 0 ? null : {author: authorMostLikes, likes: maxCount }
  }

  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }