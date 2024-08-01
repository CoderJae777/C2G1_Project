Cypress.Commands.add("login", (username, password) => {
    cy.session([username, password], () => {
        cy.window().then((win) => {
            win.document.body.style.cssText += `
            position: fixed;
            width: 100%;
            overflow: hidden;
            `;
        });
        cy.visit("/AdminLoginPage").wait(1000);
    
        cy.get('input[placeholder="Username"]').type(username).wait(250);
        cy.get('input[placeholder="Password"]').type(password).wait(250);
        cy.get('button[type="submit"]').wait(250).click();
    
        cy.url().should("include", "/AdminHomePage");
    });
  });
  
  describe("User Scenario 04 Demo", () => {
    before(() => {
        // User starts at home page
        cy.visit("/").wait(3000);
        cy.url().should("include", "/");
    
        // Admin browse the home page
        cy.scrollTo("bottom", { duration: 2500 });
    
        // User navigates to Login Page via press book ws button
        cy.get('[data-cy="bookws-button-test"]').click();
        cy.location("pathname").should("eq", "/LoginPage").wait(1000);
    
        Cypress.session.clearAllSavedSessions();
        cy.login("admin", "admin");
    });
  
    beforeEach(() => {
        cy.session("adminSession", () => {
            cy.login("admin", "admin");
        });
        cy.visit("/AdminHomePage").wait(1000);
    
        // Prevent window from scrolling due to fixed position
        cy.window().then((win) => {
            win.document.body.style.cssText += `
            position: fixed;
            width: 100%;
            overflow: hidden;
            `;
        });
    
        // Admin navigates to Manage Workshop Page
        cy.get('[data-cy="open-tlsb"]').click();
        cy.get('[data-cy="nav-btn"]').contains('Manage Workshops').click();
        cy.location('pathname').should('eq', '/AdminManageWorkshopPage');
    });
  
    it("Admin changes workshop details", () => {
        // Ensure that the page has loaded and the workshops are visible
        cy.get('.workshop-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
    
        // Admin clicks on "Edit Details" button of one of the workshops
        cy.get('[data-cy="view-wsd-button"]').first().should('be.visible').click();
    
        // Admin changes workshop name, workshop type and workshop details
        cy.get('input[data-cy="ws-name-input"]').clear().type("New Workshop Name").wait(1000);
        cy.get('input[data-cy="ws-id-input"]').clear().type("123").wait(1000);
        cy.get('[data-cy="ws-type-select"]').click();
        cy.get('[data-cy="ws-type-item"]').contains('AI Platform').click();
        cy.get('textarea.change-workshop-details-input').clear().type("Look here!! This is the new workshop details!!");
    
        // Admin submits changes
        cy.get('[data-cy="edit-ws-details-submit-btn"]').click();
    
        // Admin views workshops to check that changes have been made
        cy.get('[data-cy="ws-name"]').contains("New Workshop Name").should('exist');
        cy.get('[data-cy="ws-id"]').contains("123").should('exist');
        cy.get('[data-cy="ws-type"]').contains("AI Platform").should('exist');
        cy.get('[data-cy="ws-details"]').contains("Look here!! This is the new workshop details!!").should('exist');
    });
  
    it("Admin changes workshop availability", () => {
        // Ensure that the page has loaded and the workshops are visible
        cy.get('.workshop-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
    
        // Admin clicks on "Edit Details" button of another workshop
        cy.get('[data-cy="view-wsd-button"]').eq(1).should('be.visible').click();
    
        // Admin changes workshop availability from "Available" to "Unavailable"
        cy.get('[data-cy="ws-avail-select"]').click();
        cy.get('[data-cy="ws-avail-item"]').contains('Unavailable').click();
    
        // Admin submits changes
        cy.get('[data-cy="edit-ws-details-submit-btn"]').click();
    
        // Admin views workshops to check that changes have been made
        cy.get('.workshop-card').eq(1).within(() => {
            cy.get('[data-cy="ws-avail"]').contains('Unavailable').should('exist');
        });
    });
});
  