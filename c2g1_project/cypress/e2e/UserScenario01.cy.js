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
    // User starts at home page
    cy.visit("/").wait(3000);
    cy.url().should("include", "/");

    // Client browse the home page
    cy.scrollTo("bottom", { duration: 2500 });

    // User navigates to Login Page via press book ws button
    cy.get('[data-cy="bookws-button-test"]').click();
    cy.location("pathname").should("eq", "/LoginPage").wait(1000);

    Cypress.session.clearAllSavedSessions();
    cy.login("johndoefromjohnbrosinc", "johndoefromjohnbrosinc");
  });

  beforeEach(() => {
    cy.session("clientSession", () => {
      cy.login("johndoefromjohnbrosinc", "johndoefromjohnbrosinc");
    });
    cy.visit("/ClientHomePage").wait(1000);

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
    cy.get(".view-avail-ws-select").should("be.visible").select("0").wait(1500);

    // Auto populates the workshop
    cy.get(".popwsreqbut").should("be.visible").wait(1500).click().wait(1500);

    // Fill out the form
    cy.get("form").within(() => {
      cy.get('input[placeholder="Role at Company"]')
        .type("President")
        .wait(1000);
      cy.get('input[placeholder="Your Name"]').type("John Doe").wait(1000);
      cy.get('input[placeholder="Your Email"]')
        .type("john.doe@gmail.com")
        .wait(1000);
      cy.get('input[placeholder="Phone Number"]').type("1234567890").wait(1000);
      cy.get('input[placeholder="Your Company"]')
        .type("Doe Enterprises")
        .wait(1000);
      cy.get('select[title="Select the number of participants"]')
        .should("be.visible")
        .select("10 - 20");

      cy.get('input[placeholder="Deal Size Potential in USD"]')
        .type("1000")
        .wait(1000);
      cy.get('input[placeholder="Country"]').type("USA").wait(1000);
      cy.get('input[placeholder="Venue"]').type("Central Hall").wait(1000);

      cy.get('input[placeholder="Workshop Start Date"]').click().wait(500);
      cy.get(".react-datepicker").should("be.visible");
      cy.get(
        ".react-datepicker__day--today:not(.react-datepicker__day--disabled)"
      )
        .first()
        .click();

      cy.get('input[placeholder="Workshop End Date"]').click().wait(500);
      cy.get(".react-datepicker").should("be.visible");
      cy.get(
        ".react-datepicker__day--today:not(.react-datepicker__day--disabled)"
      )
        .next()
        .click();

      cy.get('textarea[placeholder="Your Message"]')
        .type("Looking forward to the workshop!")
        .wait(1000);
    });

    cy.get(".ws_req_submit_button").click({ force: true });

    // Check if the summary modal appears
    cy.get(".summary-modal", { timeout: 20000 })
      .should("be.visible")
      .wait(1500);

    // Check if the summary details are correct
    cy.get(".summary-content").within(() => {
      cy.get("p").contains("Workshop ID: 01");
      cy.get("p").contains("Workshop Name: Intro to Python");
      cy.get("p").contains("Role at Company: President");
      cy.get("p").contains("Name: John Doe");
      cy.get("p").contains("Email: john.doe@gmail.com");
      cy.get("p").contains("Phone Number: 1234567890");
      cy.get("p").contains("Company Name: Doe Enterprises");
      cy.get("p").contains("Number of Pax: 10-20");
      cy.get("p").contains("Deal Size Potential: 1000");
      cy.get("p").contains("Country: USA");
      cy.get("p").contains("Venue: Central Hall");
      cy.get("p").contains("Workshop Type: Business Value Discovery");
      cy.get("p").contains("Message: Looking forward to the workshop!");
    });

    // John forgets 2 ZEROs!! He spot it in the summary modal
    // Clicks Edit Request
    cy.get(".summary-buttons").within(() => {
      cy.get("button").contains("Edit Request").click().wait(1000);
    });

    cy.get(".summary-modal").should("not.exist");

    // John updates the new deal size potential
    cy.get('input[placeholder="Deal Size Potential in USD"]')
      .wait(500)
      .type("00")
      .wait(1000);

    cy.get(".ws_req_submit_button").click({ force: true });

    // Check if the summary modal appears
    cy.get(".summary-modal", { timeout: 20000 })
      .should("be.visible")
      .wait(1500);

    // Confirm Request
    cy.get(".summary-buttons").within(() => {
      cy.get("button").contains("Confirm Request").click();
    });

    cy.get(".summary-modal").should("not.exist").wait(3000);
  });

  it("Testing Workshop Request Status Visibility and Functionality", () => {
    // Ensure that the "View Request Status" section is visible
    cy.get(".view-req-st")
      .should("be.visible")
      .within(() => {
        // Ensure that there are pending workshop requests
        cy.get(".scrollable-list")
          .children()
          .should("have.length.greaterThan", 0);

        // Check for specific statuses and request IDs
        cy.get(".workshop-detail-panel").each((panel) => {
          cy.wrap(panel).should("contain.text", "submitted");
          // Optionally check other statuses like "approved", "rejected", etc.
        });
      });
  });
});
