const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        assert.strictEqual(listHelper.totalLikes([{title: 'title1', likes: 5}]), 5)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [{title: 'title1', likes: 5}, {title: 'title2', likes: 3}, {title: 'titl3', likes: 11}]
        assert.strictEqual(listHelper.totalLikes(blogs), 19)
    })
})