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
    
        // Admin navigates to Manage Trainer Page
        cy.get('[data-cy="open-tlsb"]').click();
        cy.get('[data-cy="nav-btn"]').contains('Manage Trainers').click();
        cy.location('pathname').should('eq', '/AdminManageTrainerPage');
    });

    it("Admin adds a new trainer", () => {
        // Admin views trainer list
        cy.get('[data-cy="trainer-info-table"]').should('be.visible');

        // Admin clicks on "Add Trainer" button
        cy.get('[data-cy="add-trainer-button"]').click();
        cy.get('[data-cy="add-trainer-popup"]').should('be.visible');

        // Admin fills in the required fields in the add trainer popup
        cy.get('[data-cy="trainer-name-input"]').type("Test Trainer");
        cy.get('[data-cy="trainer-id-input"]').type("test_trainer");
        cy.get('[data-cy="trainer-email-input"]').type("test@trainer.com");
        cy.get('[data-cy="trainer-pw-input"]').type("password");
        cy.get('[data-cy="select-role-btn"]').click();
        cy.get('[data-cy="role-option"]').contains('Training Lead').click();

        // Admin submits new trainer details
        cy.get('[data-cy="add-trainer-submit-button"]').click();

        // Admin views trainer list to check that the trainer is added to the trainer list
        cy.get('[data-cy="trainer-info-table"]').should('contain', 'Test Trainer');
    });

    it("Admin views trainer schedule", () => {
        // Admin clicks on "View Schedule" button of another trainer
        cy.get('[data-cy="trainer-schedule-button"]').first().click();

        // Verify the schedule is displayed correctly in calendar view
        cy.get('[data-cy="trainer-schedule-calendar-popup"]').should('be.visible');
    });
    
    it("Admin edits trainer details", () => {
        // Admin clicks on "Edit Details" button of a trainer
        cy.get('[data-cy="trainer-details-button"]').first().click();
        cy.get('[data-cy="edit-trainer-details-popup"]').should('be.visible');

        // Admin changes trainer role
        cy.get('[data-cy="select-trainer-role-button"]').click();
        cy.get('[data-cy="trainer-role-option"]').contains('Training Assistant').click();

        // Admin submits the change
        cy.get('[data-cy="edit-trainer-details-submit-button"]').click();

        // Admin views trainer list to check that the change has been made (initially there are no trainers with role "Training Assistant")
        cy.get('[data-cy="trainer-info-table"]').should('contain', 'Training Assistant');

        it("Admin changes trainer activity", () => {
            // Admin clicks on "Activity" button of a trainer
            cy.get('[data-cy="trainer-activity-button"]').first().click();
        
            // Verify the Trainer Activity popup is displayed
            cy.get('[data-cy="trainer-activity-popup"]').should('be.visible');
        
            // Admin selects "Inactive" from the dropdown
            cy.get('[data-cy="trainer-activity-select-button"]').click();
            cy.get('[data-cy="trainer-activity-option"]').contains('Inactive').click();
        
            // Admin submits the change
            cy.get('[data-cy="trainer-activity-submit-button"]').click();
        
            // Verify that the trainer's status has been updated to "Inactive" in the trainer list
            cy.get('[data-cy="trainer-info-table"]').should('contain', 'Inactive');
        });        
    });

    it("Admin deletes a trainer", () => {
        // Admin clicks on "Delete" button of a trainer
        cy.get('[data-cy="delete-trainer-button"]').first().click();
        
        // Verify the Delete Trainer popup is visible
        cy.get('[data-cy="trainer-activity-popup"]').should('be.visible');
        
        // Admin submits confirmation of deletion
        cy.get('[data-cy="confirm-delete-trainer-button"]').click();
        cy.wait(1000);
        
        // Verify the trainer is no longer in the trainer list
        // cy.get('[data-cy="trainer-info-table"]').should('not.contain', 'trainer');
        // Verify there are only 2 trainers left in the trainer list
        cy.get('[data-cy="trainer-info-table"]')
        .find('tr')
        .should('have.length', 3); // 1 header + 2 trainers
    });
});