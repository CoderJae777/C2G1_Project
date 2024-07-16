import React from 'react';
import { mount } from 'cypress/react18';
import { BrowserRouter as Router } from 'react-router-dom';
import TopLeftSideBar from '../../src/components/TopLeftSideBar';

describe('TopLeftSideBar Component', () => {
  const mountComponent = () => {
    mount(
      <Router>
        <TopLeftSideBar />
      </Router>
    );
  };

  it('toggles the navigation menu', () => {
    mountComponent();
    cy.get('[data-cy="nav"]').should('not.have.class', 'open');
  // Open the menu
  cy.get('[data-cy="open-tlsb"]').click({ force: true });
  cy.get('[data-cy="nav"]').should('have.class', 'open');
  // Close the menu
  cy.get('[data-cy="open-tlsb"]').click({ force: true });
  cy.get('[data-cy="nav"]').should('not.have.class', 'open');
  });

  it('navigates to Admin Home Page', () => {
    mountComponent();
    cy.get('[data-cy="open-tlsb"]').click();
    cy.get('[data-cy="nav-btn"]').contains('Home').click();
    cy.location('pathname').should('eq', '/AdminHomePage');
  });

  it('navigates to Profile Page', () => {
    mountComponent();
    cy.get('[data-cy="open-tlsb"]').click();
    cy.get('[data-cy="nav-btn"]').contains('Profile').click();
    cy.location('pathname').should('eq', '/ProfilePage');
  });

  it('navigates to Workshop Requests Page', () => {
    mountComponent();
    cy.get('[data-cy="open-tlsb"]').click();
    cy.get('[data-cy="nav-btn"]').contains('Workshop Requests').click();
    cy.location('pathname').should('eq', '/AdminWorkshopRequestPage');
  });

  it('navigates to Manage Trainers Page', () => {
    mountComponent();
    cy.get('[data-cy="open-tlsb"]').click();
    cy.get('[data-cy="nav-btn"]').contains('Manage Trainers').click();
    cy.location('pathname').should('eq', '/AdminManageTrainerPage');
  });

  it('logs out successfully', () => {
    mountComponent();
    cy.intercept('GET', '**/logout', {
      statusCode: 200,
      body: { status: true },
    }).as('logoutRequest');
    cy.get('[data-cy="open-tlsb"]').click();
    cy.get('.nav-link').contains('Logout').click();
    cy.wait('@logoutRequest');
    cy.location('pathname').should('eq', '/');
  });

  it('closes the navigation menu when overlay is clicked', () => {
    mountComponent();
    // Open the menu
    cy.get('[data-cy="open-tlsb"]').click(); 
    // Click overlay to close menu
    cy.get('section.overlay').click({ force: true });
    cy.get('[data-cy="nav"]').should('not.have.class', 'open');
  });
});
