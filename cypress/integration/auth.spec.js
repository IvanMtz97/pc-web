/// <reference types="cypress" />

context('Auth', () => {
  it('Should show login page when first time entry', () => {
    cy.visit('http://localhost:3000');
    cy.location('pathname').should('include', '/login');
  });

  it('Should show login when trying to access encuesta_estructuras without a valid session', () => {
    cy.visit('http://localhost:3000/encuesta_estructuras');
    cy.location('pathname').should('include', '/login');
  });

  it('Should show login when trying to access to /login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy=login-form]').should('be.visible');
  });

  it('Should redirect to encuesta_estructuras when successful admin sign in', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy=user-input]').type('admin');
    cy.get('[data-cy=password-input]').type('Asdqwe123.');
    cy.get('[data-cy=signin-button]').click();
    cy.get('[data-cy=sweeps-poll-container]').should('be.visible');
  });

  it('Should render admin layout when successful sign in', () => {
    cy.get('[data-cy=admin-layout]').should('be.visible');
    cy.get('[data-cy=admin-sidebar-menu]').should('be.visible');
    cy.get('[data-cy=admin-sidebar-menu]').children().should('have.length.greaterThan', 0);
  });

  it('Should redirect to login when click on logout button', () => {
    cy.get('[data-cy=signout-button]').click();
    cy.location('pathname').should('include', '/login');
  });
});