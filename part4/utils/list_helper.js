const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((acc, currentVal) => acc + currentVal.likes, 0)
  }
  
  module.exports = {
    dummy, totalLikes
  }