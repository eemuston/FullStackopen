const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Eemeli Mustonen',
        username: 'eemuston',
        password: 'sekret'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'sekret')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'This is a test blog', 'Test Blogger', 'www.testblogs.com')
      await expect(page.getByText('create new blog')).toBeVisible()
      await expect(page.getByText('This is a test blog Test Blogger')).toBeVisible()
      await expect(page.getByText('view')).toBeVisible()
    })

    describe('and blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'This is a test blog', 'Test Blogger', 'www.testblogs.com')
      })

      test('blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('0')).toBeVisible()
        await expect(page.getByText('1')).not.toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('0')).not.toBeVisible()
        await expect(page.getByText('1')).toBeVisible()
      })

      test('blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('delete')).toBeVisible()
        page.on('dialog', async dialog => await dialog.accept())
        await page.getByRole('button', { name: 'delete' }).click()
        await expect(page.getByText('This is a test blog Test Blogger')).not.toBeVisible()
      })

      test("you can't see delete button if blog isn't created by you", async ({ page }) => {
        await page.getByRole('button', { name: 'log out' }).click()
        await loginWith(page, 'eemuston', 'sekret')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('delete')).not.toBeVisible()
        await page.getByRole('button', { name: 'log out' }).click()
        await loginWith(page, 'mluukkai', 'salainen')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('delete')).toBeVisible()
      })

      test("blogs are sorted by likes", async ({ page }) => {
        await createBlog(page, 'second blog', 'tester', 'www.testblogs.com')
        await createBlog(page, 'third blog', 'tester', 'www.testblogso.com')

        const viewButtons = await page.getByRole('button', { name: 'view'} ).all()
        await viewButtons[0].click()
        await viewButtons[0].click()
        await viewButtons[0].click()

        
        const likeButtons = await page.getByRole('button', { name: 'like'} ).all()
        await likeButtons[0].click()
        await likeButtons[1].click()
        await likeButtons[1].click()
        await likeButtons[1].click()
        await likeButtons[2].click()
        await likeButtons[2].click()
        await likeButtons[1].click()
        await likeButtons[0].click()
        await likeButtons[0].click()
        await likeButtons[0].click()
        await likeButtons[0].click()
        await likeButtons[2].click()

        const blogs = await page.locator('.blog').all()
        
        const likes = await Promise.all(blogs.map(async blog => {
          const text = await blog.textContent()
          const match = text.match(/likes\s*(\d+)/i)
          if (match) likes.push(Number(match[1]))
        }))

        const sortedLikes = [...likes].sort((a, b) => b - a)
        expect(likes).toEqual(sortedLikes)

        const titles = page.locator('[name="titleandauthor"]')
        const texts = await titles.allTextContents()

        expect(texts[0]).toEqual('second blog tester hide')
      })
    })
  })
})