const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  const maxBlogs = _(blogs)
    .groupBy('author')
    .map((author, key) => ({
      author: key,
      blogs: author.length
    }))
    .maxBy('blogs')
  console.log('maxBlogs: ', maxBlogs)
  return maxBlogs
}

const mostLikes = (blogs) => {
  const favoriteAuthor = _(blogs)
    .groupBy('author')
    .map((id, key) => ({
      author: key,
      likes: _.sumBy(id, 'likes')
    }))
    .maxBy('likes')
  console.log('groupAuthors: ', favoriteAuthor)
  return favoriteAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
