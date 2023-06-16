/// <reference types="cypress" />

describe('moviebookingapp homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/home');
  });

  it('displays carousel with 3 tiles', () => {
    cy.get('.carousel-inner ex').should('have.length', 3);
  });
});
