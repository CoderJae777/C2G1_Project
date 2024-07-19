Cypress.Commands.add("login", (username, password) => {
  // Save this entire log information under a session
  cy.session([username, password], () => {
    cy.window().then((win) => {
      win.document.body.style.cssText += `
        position: fixed;
        width: 100%;
        overflow: hidden;
      `;
    });
    cy.visit("/ClientLoginPage").wait(1000); // Adjust the routes to match the login page

    // Enter the login credentials and submit the form
    cy.get('input[placeholder="Username"]').type(username).wait(250);
    cy.get('input[placeholder="Password"]').type(password).wait(250);
    cy.get('button[type="submit"]').wait(250).click();

    cy.url().should("include", "/ClientHomePage");
  });
});

describe("Client Home Page Test", () => {
  // Log in once before all tests and save the session
  before(() => {
    // Clear all sessions before making a new one
    Cypress.session.clearAllSavedSessions();

    cy.login("johndoefromjohnbrosinc", "johndoefromjohnbrosinc"); // Replace this if client credentials change
  });

  // Every test should start retrieving the session that is created by before()
  // then visit ClientHomePage
  beforeEach(() => {
    cy.session("clientSession", () => {
      cy.login("johndoefromjohnbrosinc", "johndoefromjohnbrosinc");
    });

    cy.visit("/ClientHomePage");

    // Prevent the page from jumping around when auto-filling the form
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
    cy.get(".view-avail-ws-select").wait(500).select("Option 1");
    cy.get(".popwsreqbut").wait(500).click();
    cy.get('input[placeholder="Select from dropdown to auto-populate Workshop ID"]')
      .should("have.value", "WS01")
      .wait(250);
    cy.get('input[placeholder="Select from dropdown to auto-populate Workshop Name"]')
      .should("have.value", "Introduction to Python")
      .wait(1000);
  });

  it("Testing Form Inputs", () => {
    // Populate the form first
    cy.get(".view-avail-ws-select").wait(500).select("Option 1");
    cy.get(".popwsreqbut").wait(500).click();

    cy.get("form").within(() => {
      cy.get('input[placeholder="Role at Company"]').type("President");
      cy.get('input[placeholder="Your Name"]').type("John Doe");
      cy.get('input[placeholder="Your Email"]').type("john.doe@gmail.com");
      cy.get('input[placeholder="Phone Number"]').type(1234567890);
      cy.get('input[placeholder="Your Company"]').type("Doe Enterprises");
      cy.get('input[placeholder="Number of Pax"]').type(10);
      cy.get('input[placeholder="Deal Size Potential in USD"]').type(100000);
      cy.get('input[placeholder="Country"]').type("USA");
      cy.get('input[placeholder="Venue"]').type("Central Hall");

      // Date Picker Inputs
      cy.get('input[placeholder="Workshop Start Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .first()
        .click(); // select today

      cy.get('input[placeholder="Workshop End Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .first()
        .click(); // select today
      cy.get('textarea[placeholder="Your Message"]')
        .type("Looking forward to the workshop!")
        .wait(1000);
    });
  });

  it("Testing Submit Request Button and Summary Popup", () => {
    // Populate the form first
    cy.get(".view-avail-ws-select").wait(500).select("Option 1");
    cy.get(".popwsreqbut").wait(500).click();

    cy.get("form").within(() => {
      cy.get('input[placeholder="Role at Company"]').type("President");
      cy.get('input[placeholder="Your Name"]').type("John Doe");
      cy.get('input[placeholder="Your Email"]').type("john.doe@gmail.com");
      cy.get('input[placeholder="Phone Number"]').type(1234567890);
      cy.get('input[placeholder="Your Company"]').type("Doe Enterprises");
      cy.get('input[placeholder="Number of Pax"]').type(10);
      cy.get('input[placeholder="Deal Size Potential in USD"]').type(100000);
      cy.get('input[placeholder="Country"]').type("USA");
      cy.get('input[placeholder="Venue"]').type("Central Hall");

      // Date Picker Inputs
      cy.get('input[placeholder="Workshop Start Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .first()
        .click(); // select today

      cy.get('input[placeholder="Workshop End Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .next()
        .click(); // select today
      cy.get('textarea[placeholder="Your Message"]').type(
        "Looking forward to the workshop!"
      );
    });

    // Intercept the email sending request and stub it
    // cy.intercept("POST", "https://api.emailjs.com/api/v1.0/email/send", {
    //   statusCode: 200,
    //   body: { success: true },
    // }).as("sendEmail");

    // Submit the form and SUMMARY MODAL NEED TO APPEAR
    cy.get(".ws_req_submit_button").click({ force: true });

    cy.get(".summary-modal", { timeout: 20000 })
      .should("be.visible")
      .wait(500);
    cy.get(".summary-buttons").within(() => {
      cy.get("button").contains("Edit Request").click();
    });
    cy.get(".summary-modal").should("not.exist").wait(500);

    // CLICK SUBMIT REQ AGAIN - TEST CONFIRM REQ
    cy.get(".ws_req_submit_button").click({ force: true });

    cy.get(".summary-modal", { timeout: 20000 })
      .should("be.visible")
      .wait(500);

    // Confirm the request in the summary modal
    cy.get(".summary-buttons").within(() => {
      cy.get("button").contains("Confirm Request").click();
    });
    // Wait for the intercepted request
    // cy.wait("@sendEmail").its("response.statusCode").should("eq", 200);

    // Ensure the summary modal is closed
    cy.get(".summary-modal").should("not.exist");
  });

  // it("Testing Reset Button Functionality", () => {
  //   // Populate the form first
  //   cy.get(".view-avail-ws-select").wait(500).select("Option 1");
  //   cy.get(".popwsreqbut").wait(500).click();

  //   // Fill out the form inputs
  //   cy.get("form").within(() => {
  //     cy.get('input[placeholder="Role at Company"]').type("President");
  //     cy.get('input[placeholder="Your Name"]').type("John Doe");
  //     cy.get('input[placeholder="Your Email"]').type("john.doe@gmail.com");
  //     cy.get('input[placeholder="Phone Number"]').type("1234567890");
  //     cy.get('input[placeholder="Your Company"]').type("Doe Enterprises");
  //     cy.get('input[placeholder="Number of Pax"]').type("10");
  //     cy.get('input[placeholder="Deal Size Potential in USD"]').type("100000");
  //     cy.get('input[placeholder="Country"]').type("USA");
  //     cy.get('input[placeholder="Venue"]').type("Central Hall");
  //     cy.get('textarea[placeholder="Your Message"]').type(
  //       "Looking forward to the workshop!"
  //     );
  //   });

  //   // Click the reset button
  //   cy.get(".clear-button-design").click({ force: true });

  //   // Check that the form inputs are cleared
  //   cy.get('input[placeholder="Role at Company"]').should("have.value", "");
  //   cy.get('input[placeholder="Your Name"]').should("have.value", "");
  //   cy.get('input[placeholder="Your Email"]').should("have.value", "");
  //   cy.get('input[placeholder="Phone Number"]').should("have.value", "");
  //   cy.get('input[placeholder="Your Company"]').should("have.value", "");
  //   cy.get('input[placeholder="Number of Pax"]').should("have.value", "");
  //   cy.get('input[placeholder="Deal Size Potential in USD"]').should(
  //     "have.value",
  //     ""
  //   );
  //   cy.get('input[placeholder="Country"]').should("have.value", "");
  //   cy.get('input[placeholder="Venue"]').should("have.value", "");
  //   cy.get(".view-avail-ws-select").should("have.value", "");
  //   cy.get('textarea[placeholder="Your Message"]').should("have.value", "");
  //   cy.get('input[placeholder="Workshop Start Date"]').should("have.value", "");
  //   cy.get('input[placeholder="Workshop End Date"]').should("have.value", "");
  // });
});
