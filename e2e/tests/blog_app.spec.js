const { test, expect, beforeEach, describe } = require('@playwright/test')

const blogTitle = 'PlayWright Blog'
const blogAuthor = 'PlayWright Author'

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('loginForm')).toBeVisible()
  })

  describe('Login', async () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const usernameInput = await page.getByTestId('username')
      const passwordInput = await page.getByTestId('password')
      await usernameInput.fill('hellas')
      await passwordInput.fill('artoPass')
      await page.getByRole('button').click()
      await expect(page.getByText('hellas logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameInput = await page.getByTestId('username')
      const passwordInput = await page.getByTestId('password')
      await usernameInput.fill('randomUsername')
      await passwordInput.fill('randomPassword')
      await page.getByRole('button').click()
      await expect(page.getByText('Username or password provided is invalid!')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('hellas')
      await page.getByTestId('password').fill('artoPass')
      await page.getByRole('button').click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByTestId('showBlogsForm').click()
      await page.getByTestId('titleInput').fill(blogTitle)
      await page.getByTestId('authorInput').fill(blogAuthor)
      await page.getByTestId('urlInput').fill('playwrighturl.com')
      await page.getByTestId('createBtn').click()
      await expect(page.getByText(`${blogTitle} by ${blogAuthor}`)).toBeVisible()
    })

    test('the new blog can be liked', async ({ page }) => {
      await page.getByTestId('detailsBtn').last().click()
      await page.getByTestId('likesBtn').click()
      await expect(page.getByText('Likes 1')).toBeVisible()
    })

    test('the new blog can be deleted', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await page.getByTestId('detailsBtn').last().click()
      await page.getByTestId('deleteBtn').click()
      await expect(page.getByText(`${blogTitle} by ${blogAuthor}`)).toHaveCount(0)
    })

    test('blogs are in order', async ({ page }) => {
      await page.waitForSelector('[data-testid="detailsBtn"]');
      const detailsBtns = await page.getByTestId('detailsBtn').all()
      for (const detailBtn of detailsBtns) { 
        await detailBtn.click() 
      }
      const blogLikes = await page.getByTestId('likesSpan').all()
      const likes = []
      for (const blogLike of blogLikes) { 
        likes.push( await blogLike.textContent())
      }
      const isSorted = likes.map(like => like.split(' ')[1]).every((val, i, arr) => i === arr.length - 1 || val >= arr[i + 1]); 
      expect(isSorted).toBeTruthy()
    })
  })

  describe('When another user logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('dev123')
      await page.getByTestId('password').fill('dev123')
      await page.getByRole('button').click()
    })

    test('Blog delete button not visible', async ({ page }) => {
      await page.getByTestId('detailsBtn').last().click()
      await expect(page.getByTestId('deleteBtn')).toHaveCount(0)
    })
  })
})