Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    cy.window().then((win) => {
      win.document.body.style.cssText += `
          position: fixed;
          width: 100%;
          overflow: hidden;
        `;
    });
    cy.visit("/ClientLoginPage").wait(1000);

    cy.get('input[placeholder="Username"]').type(username).wait(250);
    cy.get('input[placeholder="Password"]').type(password).wait(250);
    cy.get('button[type="submit"]').wait(250).click();

    cy.url().should("include", "/ClientHomePage");
  });
});

describe("User Scenario 01 Demo", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
    cy.login("client", "client");
  });

  beforeEach(() => {
    cy.session("clientSession", () => {
      cy.login("client", "client");
    });
    cy.visit("/ClientHomePage");

    // Prevent window from scrolling due to fixed position
    cy.window().then((win) => {
      win.document.body.style.cssText += `
          position: fixed;
          width: 100%;
          overflow: hidden;
        `;
    });
  });

  it("Testing Form inputs, Submit Request Button and Summary Popup", () => {
    // Ensure "View Available Workshops" dropdown is visible and select an option
    cy.get(".view-avail-ws-select").should("be.visible").select("0");

    // Auto populates the workshop
    cy.get(".popwsreqbut").should("be.visible").wait(500).click();

    // Fill out the form
    cy.get("form").within(() => {
      cy.get('input[placeholder="Role at Company"]').type("President");
      cy.get('input[placeholder="Your Name"]').type("John Doe");
      cy.get('input[placeholder="Your Email"]').type("john.doe@gmail.com");
      cy.get('input[placeholder="Phone Number"]').type("1234567890");
      cy.get('input[placeholder="Your Company"]').type("Doe Enterprises");
      cy.get('select[title="Select the number of participants"]')
        .should("be.visible")
        .select("10 - 20");
      cy.get('input[placeholder="Deal Size Potential in USD"]').type("1000");
      cy.get('input[placeholder="Country"]').type("USA");
      cy.get('input[placeholder="Venue"]').type("Central Hall");
      cy.get('input[placeholder="Workshop Start Date"]').click();
      cy.get(".react-datepicker").should("be.visible");
      cy.get(
        ".react-datepicker__day--today:not(.react-datepicker__day--disabled)"
      )
        .first()
        .click();

      cy.get('input[placeholder="Workshop End Date"]').click();
      cy.get(".react-datepicker").should("be.visible");
      cy.get(
        ".react-datepicker__day--today:not(.react-datepicker__day--disabled)"
      )
        .next()
        .click();

      cy.get('textarea[placeholder="Your Message"]').type(
        "Looking forward to the workshop!"
      );
    });

    cy.get(".ws_req_submit_button").click({ force: true });

    // Confirm Request
    cy.get(".summary-buttons").within(() => {
      cy.get("button").contains("Confirm Request").click();
    });

    cy.get(".summary-modal").should("not.exist");
  });
});
