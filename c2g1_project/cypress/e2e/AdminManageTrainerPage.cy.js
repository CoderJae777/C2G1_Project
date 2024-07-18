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
      cy.get('[data-cy="nav-btn"]').contains('Manage Trainers').click();
      cy.location('pathname').should('eq', '/AdminManageTrainerPage');
  
      // Prevent the page from auto-scrolling
      cy.window().then((win) => {
        win.document.body.style.cssText += `
                  position: fixed;
                  width: 100%;
                  overflow: hidden;
              `;
      });
    });
  
    it('displays trainer data', () => {
        cy.get('[data-cy="trainer-info-table"]').should('exist');
        cy.get('[data-cy="trainer-info-table"]').should('have.length.gt', 0);
      });
    
      it('opens Add Trainer popup when "Add Trainer" button is clicked', () => {
        cy.get('.add-trainer-button').click();
        cy.get('[data-cy="add-trainer-popup"]').should('exist');
        cy.get('[data-cy="add-trainer-cancel-button"]').click();
        cy.get('[data-cy="add-trainer-popup"]').should('not.exist');
      });
    
      it('opens Edit Trainer Details popup when "Edit Details" button is clicked', () => {
        cy.get('[data-cy="trainer-info-table"]').first().find('button').contains('Edit Details').click();
        cy.get('[data-cy="edit-trainer-details-popup"]').should('exist');
        cy.get('[data-cy="edit-trainer-details-cancel-button"]').click();
        cy.get('[data-cy="edit-trainer-details-popup"]').should('not.exist');
      });
    
      it('opens Trainer Schedule Calendar when "View Schedule" button is clicked', () => {
        cy.get('[data-cy="trainer-info-table"]').first().find('button').contains('View Schedule').click();
        cy.get('[data-cy="trainer-schedule-calendar-popup"]').should('exist');
        cy.get('[data-cy="tsc-close-button"]').click();
        cy.get('[data-cy="trainer-schedule-calendar-popup"]').should('not.exist');
      });
    
      it('opens Trainer Activity popup when "Active"/"Inactive" button is clicked', () => {
        cy.get('[data-cy="trainer-activity-button"]').first().click();
        cy.get('[data-cy="trainer-activity-popup"]').should('exist');
        cy.get('[data-cy="trainer-activity-cancel-button"]').click();
        cy.get('[data-cy="trainer-activity-popup"]').should('not.exist');
      });
  });
  