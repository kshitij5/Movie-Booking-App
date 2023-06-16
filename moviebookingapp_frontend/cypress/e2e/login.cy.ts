/// <reference types="cypress" />

describe('moviebookingapp loginpage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login ');
  });

  it('submit form successfully', () => {

    cy.get('.').type('fake@email.com').should('have.value', 'fake@email.com');

    cy.get('.action-email').type('password').should('have.value', 'password');

    cy.get('.action-form')
      .submit()
      .next()
      .should('contain', 'Your form has been submitted!');
  });

  
  it('submit form failed', () => {
    cy.get('.action-form')
      .submit()
  });
});
