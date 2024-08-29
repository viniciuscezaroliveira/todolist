describe('Navigation', () => {

  after(() => {
    cy.log('Tests finish');
  });

    it('should login page', () => {
      const sufixEmailRandom = Math.floor(Math.random() * 1000)
      const email = `cypress.${sufixEmailRandom}@cypress.com`
      cy.visit('http://localhost:3000/')
      //create account
      cy.contains('button', 'Create account').click();
      cy.url().should('contain', '/create-account');
      cy.get('#name').type('cypress');
      cy.get('#email').type(email);
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('button[type="submit"]').click()

      //login
      cy.url().should('contain', '/login');
      cy.get('#email').type(email);
      cy.get('#email').should('have.value',email);
      cy.get('#password').type('123456');
      cy.get('button[type="submit"]').click()
      

      // new todo
      cy.url().should('contain', '/todo-list');
      cy.get('#title-task').type("new todo for cypress");
      cy.get("#add-task").click()
      cy.get('span').contains('new todo for cypress')
      cy.get("#btn-completed").click()
      
      //filter
      cy.get("#filter-options").select("Not Completed")
      cy.wait(2000);
      cy.get('span').should('not.contain', 'new todo for cypress');
      cy.get("#filter-options").select("Completed")
      cy.wait(2000);
      cy.get('span').contains('new todo for cypress')
  
      //user info
      cy.get('span').contains(email)
      cy.get('span').contains("cypress")
      cy.get("#logout").click()
      cy.wait(2000);
      cy.url().should('contain', '/login');
    
    })
  })