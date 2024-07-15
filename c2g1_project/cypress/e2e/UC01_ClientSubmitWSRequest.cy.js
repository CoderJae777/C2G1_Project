describe("Client Home Page Test", () => {
    beforeEach(() => {
        cy.visit("/ClientHomePage");
        // Fix the page position to prevent scrolling
        cy.window().then((win) => {
            win.document.body.style.position = 'fixed';
        });
    });

    afterEach(() => {
        // Revert the fixed position after the test
        cy.window().then((win) => {
            win.document.body.style.position = '';
        });
    });

    it("Home Page Rendered Successfully", () => {
        cy.url().should("include", "/ClientHomePage");
    });

    it("Testing all headings", () => {
        cy.get('.ws_req_form_heading').should("contain.text", "Submit Workshop Request");
        cy.get('.ws_req_form_heading').should("contain.text", "View Request Status");
        cy.get('.ws_req_form_heading').should("contain.text", "View Available Workshops");
    });

    it("Testing Buttons functionality", () => {
        // Intercept the email sending request and stub it
        cy.intercept('POST', 'https://api.emailjs.com/api/v1.0/email/send', {
            statusCode: 200,
            body: { success: true }
        }).as('sendEmail');

        cy.get('.view-avail-ws-select').scrollIntoView().select("Option 1");
        cy.get('.popwsreqbut').scrollIntoView().click();
        cy.get('input[placeholder="Workshop ID"]').should("have.value", "WS01");
        cy.get('input[placeholder="Workshop Name"]').should("have.value", "Introduction to Python");

        cy.get('form').within(() => {
            cy.get('input[placeholder="Your Name"]').scrollIntoView().type("John Doe");
            cy.get('input[placeholder="Your Email"]').scrollIntoView().type("john.doe@example.com");
            cy.get('input[placeholder="Phone Number"]').scrollIntoView().type("1234567890");
            cy.get('input[placeholder="Your Company"]').scrollIntoView().type("Doe Enterprises");
            cy.get('input[placeholder="Number of Pax"]').scrollIntoView().type("10");
            cy.get('input[placeholder="Deal Size Potential"]').scrollIntoView().type("Large");
            cy.get('input[placeholder="Location"]').scrollIntoView().type("New York");
            cy.get('textarea[placeholder="Your Message"]').scrollIntoView().type("Looking forward to the workshop!");
        });

        cy.get('.ws_req_submit_button').scrollIntoView().click();
        cy.get('.summary-modal').should("be.visible");
        cy.get('.summary-content').within(() => {
            cy.get('button').contains("Confirm Request").click();
        });

        // Wait for the intercepted request
        cy.wait('@sendEmail').its('response.statusCode').should('eq', 200);
        cy.get('.summary-modal').should("not.exist");
    });
});
