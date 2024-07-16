/// <reference types="cypress" />

// Custom command for login
Cypress.Commands.add("login", (username, password) => {
  // Save the entire login information under a session
  cy.session([username, password], () => {
    cy.window().then((win) => {
      win.document.body.style.cssText += `
              position: fixed;
              width: 100%;
              overflow: hidden;
          `;
    });
    cy.visit("/AdminLoginPage").wait(3000); // Adjust the route to match the login page

    // Enter the login credentials and submit the form
    cy.get('input[placeholder="Username"]').type(username).wait(500);
    cy.get('input[placeholder="Password"]').type(password).wait(500);
    cy.get('button[type="submit"]').wait(500).click();

    cy.url().should("include", "/AdminHomePage");
  });
});

describe("Admin Workshop Request Page Tests", () => {
  // Log in once before all tests and save the session
  before(() => {
    // Clear all sessions before making a new one
    Cypress.session.clearAllSavedSessions();
    cy.login("admin", "admin"); // Replace with actual admin credentials if they change
  });

  // Every test should start by retrieving the session created by before() and then visit AdminHomePage
  beforeEach(() => {
    cy.session("adminSession", () => {
      cy.login("admin", "admin");
    });

    cy.visit("/AdminHomePage");

    cy.url().should("include", "/AdminHomePage");
    cy.get('[data-cy="open-tlsb"]').click();
    cy.get('[data-cy="nav-btn"]').contains('Workshop Requests').click();
    cy.location('pathname').should('eq', '/AdminWorkshopRequestPage');

    // Prevent the page from auto-scrolling
    cy.window().then((win) => {
      win.document.body.style.cssText += `
                position: fixed;
                width: 100%;
                overflow: hidden;
            `;
    });
  });

  // it("logs in to Admin Home Page, then visit Admin Workshop Request Page", () => {
  //   cy.url().should("include", "/AdminHomePage");
  //   cy.get('[data-cy="open-tlsb"]').click();
  //   cy.get('[data-cy="nav-btn"]').contains('Workshop Requests').click();
  //   cy.location('pathname').should('eq', '/AdminWorkshopRequestPage');
  // });

  it('displays workshop requests', () => {
    cy.get('[data-cy="nav"]').should('have.length.gt', 0);
  });

  it('opens details popup when "View Details" is clicked', () => {
    cy.get('[data-cy="view-wsd-button"]').first().click();
    cy.get('[data-cy="wsrqd-popup"]').should('exist');
  });

  it('opens approve popup when "Approve" is clicked', () => {
    cy.get('[data-cy="approve-wsrq-button"]').first().click();
    cy.get('[data-cy="approve-wsrq-popup"]').should('exist');
  });

  it('opens allocate trainer popup when "Allocate Trainer" is clicked', () => {
    cy.get('[data-cy="allocate-trainer-button"]').first().click();
    cy.get('[data-cy="allocate-trainer-popup"]').should('exist');
  });

  it('opens reject popup when "Reject" is clicked', () => {
    cy.get('[data-cy="reject-wsrq-button"]').first().click();
    cy.get('[data-cy="reject-wsrq-popup"]').should('exist');
  });

  it('closes Workshop Request Details popup when "Close" is clicked', () => {
    cy.get('[data-cy="view-wsd-button"]').first().click();
    cy.get('[data-cy="wsrqd-popup"]').should('exist');
    cy.get('[data-cy="wsrqd-close-button"]').click();
    cy.get('[data-cy="wsrqd-popup"]').should('not.exist');
  });

  it('closes Approve Workshop Request popup when "Cancel" is clicked', () => {
    cy.get('[data-cy="approve-wsrq-button"]').first().click();
    cy.get('[data-cy="approve-wsrq-popup"]').should('exist');
    cy.get('[data-cy="approve-wsrq-cancel-button"]').click();
    cy.get('[data-cy="approve-wsrq-popup"]').should('not.exist');
  });

  it('closes Allocate Trainer popup when "Cancel" is clicked', () => {
    cy.get('[data-cy="allocate-trainer-button"]').first().click();
    cy.get('[data-cy="allocate-trainer-popup"]').should('exist');
    cy.get('[data-cy="allocate-trainer-cancel-button"]').click();
    cy.get('[data-cy="allocate-trainer-popup"]').should('not.exist');
  });

  it('closes Reject Workshop Request popup when "Cancel" is clicked', () => {
    cy.get('[data-cy="reject-wsrq-button"]').first().click();
    cy.get('[data-cy="reject-wsrq-popup"]').should('exist');
    cy.get('[data-cy="reject-wsrq-cancel-button"]').click();
    cy.get('[data-cy="reject-wsrq-popup"]').should('not.exist');
  });
});
