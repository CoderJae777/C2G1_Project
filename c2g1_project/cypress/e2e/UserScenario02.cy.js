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
  
  describe("User Scenario 03 Demo", () => {
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
    
        // Admin navigates to Admin Worshop Request Page
        cy.get('[data-cy="open-tlsb"]').click();
        cy.get('[data-cy="nav-btn"]').contains('Workshop Requests').click();
        cy.location('pathname').should('eq', '/AdminWorkshopRequestPage');
    });

    it('Admin views workshop requests and details', () => {
        // Admin views workshop requests
        cy.get('[data-cy="workshop-request-table"]').should('be.visible');
    
        // Admin views details of one of the workshop requests by clicking on its "View Details" button
        cy.get('[data-cy="view-wsd-button"]').last().click();
    
        // Ensure the popup is visible
        cy.get('[data-cy="wsrqd-popup"]').should('be.visible');
    
        // Validate details in the popup
        cy.get('[data-cy="wsrqd-popup"] .workshop-details-content').within(() => {
          cy.get('td').contains('Client Company:').next().should('not.be.empty');
          cy.get('td').contains('Client Name:').next().should('not.be.empty');
          cy.get('td').contains('Client Role:').next().should('not.be.empty');
          cy.get('td').contains('Client Email:').next().should('not.be.empty');
          cy.get('td').contains('Client Phone Number:').next().should('not.be.empty');
          cy.get('td').contains('Start Date:').next().should('not.be.empty');
          cy.get('td').contains('End Date:').next().should('not.be.empty');
          cy.get('td').contains('Deal Size:').next().should('not.be.empty');
          cy.get('td').contains('Country:').next().should('not.be.empty');
          cy.get('td').contains('Venue:').next().should('not.be.empty');
          cy.get('td').contains('Attendees:').next().should('not.be.empty');
          cy.get('td').contains('Message:').next().should('not.be.empty');
        });
    
        // Close the popup
        // cy.get('[data-cy="wsrq-cancel-button"]').click();
        cy.get('body').click(0, 0);
        cy.get('[data-cy="wsrqd-popup"]').should('not.exist');
    });

    it('Admin approves a workshop request', () => {
        // Admin clicks on the same workshop request’s "Approve" button
        cy.get('[data-cy="approve-wsrq-button"]').first().click();
    
        // Ensure the approve popup is visible
        cy.get('[data-cy="approve-wsrq-popup"]').should('be.visible');
    
        // Admin selects trainers to be assigned to the workshop request
        cy.get('[data-cy="select-trainer"]').click();
        cy.get('[data-cy="trainer-list"] li').first().click(); // Select the first trainer
        // cy.get('[data-cy="trainer-list"] li').eq(1).click(); // Select the second trainer
    
        // Verify selected trainers count
        cy.get('[data-cy="select-trainer-text"]').should('contain', '1 Selected');
    
        // Admin submits workshop request approval
        cy.get('[data-cy="select-trainer"]').click(); // close the dropdown
        cy.get('[data-cy="approve-wsrq-submit-button"]').click();
    
        // Ensure the approval popup is closed
        cy.get('[data-cy="approve-wsrq-popup"]').should('not.exist');
    
        // Verify the workshop request status update (this step assumes there's a status indicator that changes)
        cy.get('[data-cy="ar-workshop-request-table"]')
            .find('[data-cy="request-status"]')
            .first()
            .should('contain', 'Approved')
            .should('be.visible');  // Ensure the status is visible
    });

    it('Admin changes assigned trainer and verifies the change', () => {
        // Admin views details of the workshop request that they just approved by clicking on its "View Details" button
        cy.get('[data-cy="view-wsd-button"]').first().click();
    
        // Ensure the popup is visible
        cy.get('[data-cy="wsrqd-popup"]').should('be.visible');
    
        // Admin changes one of the assigned trainers with another trainer
        cy.get('[data-cy="select-trainer"]').click();
        // cy.get('[data-cy="select-trainer"]').click();
        cy.get('[data-cy="trainer-list"] li').first().click(); // Unselect the first trainer
        cy.get('[data-cy="trainer-list"] li').eq(1).click(); // Select the second trainer
    
        // Verify selected trainers count
        cy.get('[data-cy="select-trainer-text"]').should('contain', '1 Selected');
    
        // Admin submits the change
        cy.get('[data-cy="select-trainer"]').click(); // close the dropdown
        cy.get('[data-cy="wsrq-submit-button"]').click();
    
        // Ensure the approval popup is closed
        cy.get('[data-cy="approve-wsrq-popup"]').should('not.exist');
    
        // Admin views details of the same workshop request by clicking on its "View Details" button, to check that the change has been made
        cy.get('[data-cy="view-wsd-button"]').first().click();
    
        // Ensure the popup is visible
        cy.get('[data-cy="wsrqd-popup"]').should('be.visible');
    
        // Validate that the trainer change has been made
        cy.get('[data-cy="wsrqd-popup"] .workshop-details-content').within(() => {
            cy.get('td').contains('Assigned Trainer:').next().should('contain', 'Trainer_3_JohnDoe');
        });
    
        // Close the popup by clicking anywhere outside the popup
        cy.get('body').click(0, 0);
        cy.get('[data-cy="wsrqd-popup"]').should('not.exist');
    });
    
    it('Admin views dates of the approved workshop request by clicking on the "View Calendar" button', () => {   
        // Verify that the workshop request is in the list of approved workshops
    // cy.get('[data-cy="ar-workshop-request-table"]').should('be.visible');
    cy.get('[data-cy="view-calendar-button"]').first().click(); // Click the "View Calendar" button

    // Ensure the calendar popup is visible
    cy.get('[data-cy="ar-wsrq-calendar-popup"]').should('be.visible');

    // Close the calendar popup by clicking outside
    cy.get('body').click(0, 0);
    cy.get('[data-cy="ar-wsrq-calendar-popup"]').should('not.exist');
    });
});