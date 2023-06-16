/// <reference types="cypress" />

describe('moviebookingapp common', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/home');
  });

  it('has the correct title', () => {
    cy.get('.navbar-brand').contains('Book My Movie');
  });
});
