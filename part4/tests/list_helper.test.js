// const { test, describe } = require('node:test')
// const assert = require('node:assert')
// const listHelper = require('../utils/list_helper')

// test('dummy returns one', () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   assert.strictEqual(result, 1)
// })

// describe('total likes', () => {

//     test('of empty list is zero', () => {
//         assert.strictEqual(listHelper.totalLikes([]), 0)
//     })

//     test('when list has only one blog equals the likes of that', () => {
//         assert.strictEqual(listHelper.totalLikes([{title: 'title1', likes: 5}]), 5)
//     })

//     test('of a bigger list is calculated right', () => {
//         const blogs = [{title: 'title1', likes: 5}, {title: 'title2', likes: 3}, {title: 'titl3', likes: 11}]
//         assert.strictEqual(listHelper.totalLikes(blogs), 19)
//     })
// })

// describe('favorite blog', () => {
//     test('of empty list is undefined', () => {
//         assert.strictEqual(listHelper.favoriteBlog([]), undefined)
//     })

//     test('when list has only one blog that blog', () => {
//         const blog = {title: 'title1', likes: 5}
//         assert.deepStrictEqual(listHelper.favoriteBlog([blog]), blog)
//     })

//     test('when list has only many blogs the blog with most likes', () => {
//         const blogs = [{title: 'title1', likes: 5}, {title: 'title2', likes: 3}, {title: 'titl3', likes: 11}]
//         assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
//     })

//     test('when list has equal liked blogs one of the most liked', () => {
//         const blogs = [{title: 'title1', likes: 5}, {title: 'title2', likes: 3}, {title: 'titl3', likes: 5}]
//         assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[0])
//     })
// })

// describe('most blogs', () => {
//     test('of empty list is undefined', () => {
//         assert.strictEqual(listHelper.mostBlogs([]), null)
//     })

//     test('when list has only one blog that blog', () => {
//         const blog = {title: 'title1', author: 'author1', likes: 5}
//         assert.deepStrictEqual(listHelper.mostBlogs([blog]), {author: 'author1', blogs: 1})
//     })

//     test('when list has many blogs the author that wrote the most blogs', () => {
//         const blogs = [{title: 'title1', author: 'author1', likes: 5}, {title: 'title2', author: 'author2', likes: 2}, {title: 'title3', author: 'author1', likes: 7}]
//         assert.deepStrictEqual(listHelper.mostBlogs(blogs), {author: 'author1', blogs: 2})
//     })
// })

// describe('most likes', () => {
//     test('of empty list is undefined', () => {
//         assert.strictEqual(listHelper.mostLikes([]), null)
//     })

//     test('when list has only one blog that blog', () => {
//         const blog = {title: 'title1', author: 'author1', likes: 5}
//         assert.deepStrictEqual(listHelper.mostLikes([blog]), {author: 'author1', likes: 5})
//     })

//     test('when list has many blogs the author that wrote the most blogs', () => {
//         const blogs = [{title: 'title1', author: 'author1', likes: 5}, {title: 'title2', author: 'author2', likes: 2}, {title: 'title3', author: 'author1', likes: 7}]
//         assert.deepStrictEqual(listHelper.mostLikes(blogs), {author: 'author1', likes: 12})
//     })
// })


