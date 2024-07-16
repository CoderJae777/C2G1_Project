Cypress.Commands.add("login", (username, password) => {
    // SAVE THIS ENTIRE LOG INFORMATION UNDER A SESSION
    cy.session([username, password], () => {
      cy.window().then((win) => {
        win.document.body.style.cssText += `
              position: fixed;
              width: 100%;
              overflow: hidden;
          `;
      });
      cy.visit("/ClientLoginPage").wait(2000); // Adjust the routes to match the login page
  
      // Enter the login credentials and submit the form
      cy.get('input[placeholder="Username"]').type(username).wait(500);
      cy.get('input[placeholder="Password"]').type(password).wait(500);
      cy.get('button[type="submit"]').wait(500).click();
  
      cy.url().should("include", "/ClientHomePage");
    });
  });
  
  describe("Client Home Page Test", () => {
    // Log in once before all tests and SAVE THE MFKING SESSION (V IMPORTANT)
    before(() => {
      // Clear all sessions before making a new one
      Cypress.session.clearAllSavedSessions();
  
      cy.login("client", "client"); // Replace this if client credentials change
    });
  
    // Every test should start retrieving the session that is created by BEFORE()
    // then visit ClientHomePage
    beforeEach(() => {
      cy.session("clientSession", () => {
        cy.login("client", "client");
      });
  
      cy.visit("/ClientHomePage");
  
      // Stupid page keep flying up and down when auto filling the form so i added this
      cy.window().then((win) => {
        win.document.body.style.cssText += `
                  position: fixed;
                  width: 100%;
                  overflow: hidden;
              `;
      });
    });
  
    it("Testing Login To Client Home Page", () => {
      cy.url().should("include", "/ClientHomePage");
    });
  
    it("Testing Populate Button Functionality", () => {
      // Select a workshop and populate the form
      cy.get(".view-avail-ws-select").wait(1000).select("Option 1");
      cy.get(".popwsreqbut").wait(1000).click();
      cy.get('input[placeholder="Workshop ID"]')
        .should("have.value", "WS01")
        .wait(500);
      cy.get('input[placeholder="Workshop Name"]')
        .should("have.value", "Introduction to Python")
        .wait(2000);
    });
  
    it("Testing Form Inputs", () => {
      cy.get("form").within(() => {
        cy.get('input[placeholder="Workshop ID"]').type("WS01");
        cy.get('input[placeholder="Workshop Name"]').type(
          "Introduction to Python"
        );
        cy.get('input[placeholder="Role at Company"]').type("President");
        cy.get('input[placeholder="Your Name"]').type("John Doe");
        cy.get('input[placeholder="Your Email"]').type("john.doe@example.com");
        cy.get('input[placeholder="Phone Number"]').type("1234567890");
        cy.get('input[placeholder="Your Company"]').type("Doe Enterprises");
        cy.get('input[placeholder="Number of Pax"]').type("10");
        cy.get('input[placeholder="Deal Size Potential"]').type("Large");
        cy.get('input[placeholder="Location"]').type("New York");
        // Date Picker Inputs
        cy.get('input[placeholder="Workshop Start Date"]').click().wait(1000);
        cy.get('.react-datepicker__day--today + .react-datepicker__day').click(); // select tomorrow
  
        cy.get('input[placeholder="Workshop End Date"]').click().wait(1000);
        cy.get('.react-datepicker__day--today + .react-datepicker__day').next().click(); // select day after tomorrow
        cy.get('textarea[placeholder="Your Message"]')
          .type("Looking forward to the workshop!")
          .wait(2000);
      });
    });
  
    it("Testing Submit Request Button and Summary Popup", () => {
      cy.get("form").within(() => {
        cy.get('input[placeholder="Workshop ID"]').type("WS01");
        cy.get('input[placeholder="Workshop Name"]').type(
          "Introduction to Python"
        );
        cy.get('input[placeholder="Role at Company"]').type("President");
        cy.get('input[placeholder="Your Name"]').type("John Doe");
        cy.get('input[placeholder="Your Email"]').type("john.doe@example.com");
        cy.get('input[placeholder="Phone Number"]').type("1234567890");
        cy.get('input[placeholder="Your Company"]').type("Doe Enterprises");
        cy.get('input[placeholder="Number of Pax"]').type("10");
        cy.get('input[placeholder="Deal Size Potential"]').type("Large");
        cy.get('input[placeholder="Location"]').type("New York");
  
        // Date Picker Inputs
        cy.get('input[placeholder="Workshop Start Date"]').click().wait(1000);
        cy.get('.react-datepicker__day--today + .react-datepicker__day').click(); // select tomorrow
  
        cy.get('input[placeholder="Workshop End Date"]').click().wait(1000);
        cy.get('.react-datepicker__day--today + .react-datepicker__day').next().click(); // select day after tomorrow
        cy.get('textarea[placeholder="Your Message"]').type(
          "Looking forward to the workshop!"
        );
      });
      // Intercept the email sending request and stub it
      cy.intercept("POST", "https://api.emailjs.com/api/v1.0/email/send", {
        statusCode: 200,
        body: { success: true },
      }).as("sendEmail");
  
      // Submit the form and SUMMARY MODAL NEED TO APPEAR
      // OK B*TCHES HERES THE FLOW :
      // click submit req button --> opens summary modal --> click edit request button --> closes summary modal
      // click submit req button --> opens summary modal --> click confirm submit button --> mocks api call --> closes summary modal
  
      // CLICK SUBMIT REQ - TEST EDIT REQ
      cy.get(".ws_req_submit_button").click();
  
      cy.get(".summary-modal", { timeout: 20000 })
        .should("be.visible")
        .wait(3000);
      cy.get(".summary-buttons").within(() => {
        cy.get("button").contains("Edit Request").click();
      });
      cy.get(".summary-modal").should("not.exist");
  
      // CLICK SUBMIT REQ AGAIN - TEST CONFIRM REQ
      cy.get(".ws_req_submit_button").click();
  
      cy.get(".summary-modal", { timeout: 20000 })
        .should("be.visible")
        .wait(3000);
  
      // Confirm the request in the summary modal
      cy.get(".summary-buttons").within(() => {
        cy.get("button").contains("Confirm Request").click();
      });
      // Wait for the intercepted request
      cy.wait("@sendEmail").its("response.statusCode").should("eq", 200);
  
      // Ensure the summary modal is closed
      cy.get(".summary-modal").should("not.exist");
    });
  
    it("Testing Reset Button Functionality", () => {
      // Fill out the form inputs
      cy.get("form").within(() => {
        cy.get('input[placeholder="Workshop ID"]').type("WS01");
        cy.get('input[placeholder="Workshop Name"]').type(
          "Introduction to Python"
        );
        cy.get('input[placeholder="Role at Company"]').type("President");
        cy.get('input[placeholder="Your Name"]').type("John Doe");
        cy.get('input[placeholder="Your Email"]').type("john.doe@example.com");
        cy.get('input[placeholder="Phone Number"]').type("1234567890");
        cy.get('input[placeholder="Your Company"]').type("Doe Enterprises");
        cy.get('input[placeholder="Number of Pax"]').type("10");
        cy.get('input[placeholder="Deal Size Potential"]').type("Large");
        cy.get('input[placeholder="Location"]').type("New York");
        // Date Picker Inputs
        cy.get('input[placeholder="Workshop Start Date"]').click().wait(1000);
        cy.get('.react-datepicker__day--today + .react-datepicker__day').click(); // select tomorrow
  
        cy.get('input[placeholder="Workshop End Date"]').click().wait(1000);
        cy.get('.react-datepicker__day--today + .react-datepicker__day').next().click(); // select day after tomorrow
        cy.get('textarea[placeholder="Your Message"]').type(
          "Looking forward to the workshop!"
        );
      });
  
      // Click the reset button
      cy.get(".clear-button-design").click();
  
      // Check that the form inputs are cleared
      cy.get('input[placeholder="Workshop ID"]').should("have.value", "");
      cy.get('input[placeholder="Workshop Name"]').should("have.value", "");
      cy.get('input[placeholder="Role at Company"]').should("have.value", "");
      cy.get('input[placeholder="Your Name"]').should("have.value", "");
      cy.get('input[placeholder="Your Email"]').should("have.value", "");
      cy.get('input[placeholder="Phone Number"]').should("have.value", "");
      cy.get('input[placeholder="Your Company"]').should("have.value", "");
      cy.get('input[placeholder="Number of Pax"]').should("have.value", "");
      cy.get('input[placeholder="Deal Size Potential"]').should("have.value", "");
      cy.get('input[placeholder="Location"]').should("have.value", "");
      cy.get('textarea[placeholder="Your Message"]').should("have.value", "");
      cy.get('input[placeholder="Workshop Start Date"]').should("have.value", "");
      cy.get('input[placeholder="Workshop End Date"]').should("have.value", "");
    });
  });
  