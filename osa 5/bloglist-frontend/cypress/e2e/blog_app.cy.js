describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Toni Luomala',
      username: 'tonluo',
      password: 'salasana'
    }

    const user2 = {
      name: 'testikayttaja',
      username: 'testaaja',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tonluo')
      cy.get('#password').type('salasana')
      cy.get('button').click()

      cy.contains('Toni Luomala logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('lars')
      cy.get('#password').type('salainen')
      cy.get('button').click()

      cy.get('.error').contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'tonluo',
        password: 'salasana'
      })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('testing with cypress')
      cy.get('#author').type('tester')
      cy.get('#url').type('www.cypresstestingblog.com')
      cy.get('#createButton').click()
      cy.get('.notification').contains(
        'a new blog testing with cypress by tester added'
      )
    })

    describe('Blog handling', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testing with cypress',
          author: 'tester',
          url: 'www.cypresstestingblog.com'
        })
      })

      it('A blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('A blog can be deleted', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
      })

      it('A blog can be deleted only by created user', function () {
        cy.contains('logout').click()

        cy.login({ username: 'testaaja', password: 'salasana' })

        cy.contains('view').click()

        // Oletetaan että remove -painike ei ole näkyvillä, koska kirjautunut käyttäjä on eri kuin blogin luoja.
        cy.get('.remove').should('not.be.visible')
      })
      it.only('Blogs are ordered by descending likes', function () {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.createBlog({
          title: 'testing order of blogs',
          author: 'testing',
          url: 'www.likestestingblog.com'
        })

        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(1).contains('likes: 0').find('button').click()
        cy.get('.blog').eq(1).contains('likes: 1').find('button').click()

        cy.get('.blog').eq(1).contains('view').click()

        // Tarkistetaan että ensimmäisenä renderöityvässä blogissa on enemmän likeja kuin seuraavassa
        cy.get('.blog').eq(0).contains('likes: 2')
        cy.get('.blog').eq(1).contains('likes: 1')
      })
    })
  })
})
