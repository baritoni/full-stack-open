const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    const getlikes = blogs.reduce(function (prev, current) {
      return prev + current.likes
    }, 0)
    return getlikes
  }
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((x) => x.likes))
  const mostLikedBlog = blogs.find((x) => x.likes === mostLikes)
  return mostLikedBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
