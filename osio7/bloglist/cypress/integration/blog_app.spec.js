describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi ymparisto',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
   cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#loginButton').click()

      cy.contains('Testi ymparisto logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('salis')
      cy.get('#loginButton').click()

      cy.get('.error').contains('invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Cypress blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://docs.cypress.io/guides')
      cy.contains('create').click()
      cy.wait(4200)
      cy.contains('Cypress blog')
    })
  
    describe('Blogs editing', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Googlen mahti',
          author: 'Cookie',
          url: 'www.google.com'
        })
        cy.createBlog({
          title: 'Variksen',
          author: 'pelatin',
          url: 'www.google.com'
        })
      })

      it('Blog can be liked', function() {
        cy.contains('Googlen mahti Cookie').parent().find('button').click()
        cy.contains('like').click()
        cy.contains('Likes: 1')
        cy.contains('like').click()
        cy.contains('Likes: 2')
      })

      it('Blogs can be moved by correct user', function() {
        cy.contains('Googlen mahti Cookie').parent().find('button').click()
        cy.contains('remove').click()
        cy.contains('Googlen mahti Cookie').should('not.exist')
      })

      it('Blogs can not be moved by incorrect user', function() {
        cy.contains('Log out').click()
        const user = {
          name: 'huijari',
          username: 'huijari',
          password: 'huijari'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        
        cy.get('#username').type('huijari')
        cy.get('#password').type('huijari')
        cy.get('#loginButton').click()

        cy.contains('Googlen mahti Cookie').parent().find('button').click()
        cy.contains('remove').should('not.exist')
      })

      it('Blogs are in order after likes', function() {
        cy.get('.blogStyle').each((element, index, l) => {
          cy.wrap(element).contains('view').click()
          if (index === 0) {
            cy.wrap(element).contains('Googlen mahti Cookie')
          }
          if (index === 1) {
            cy.wrap(element).contains('like').click()
          }
        })
        cy.wait(500)
        cy.get('.blogStyle').each((element, index, l) => {
          if (index === 0) {
            cy.wrap(element).contains('Variksen pelatin')
          }
        })
      })
    })
  })
})