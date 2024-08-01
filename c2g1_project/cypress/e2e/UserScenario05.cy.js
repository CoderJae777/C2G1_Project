Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    cy.window().then((win) => {
      win.document.body.style.cssText += `
          position: fixed;
          width: 100%;
          overflow: hidden;
        `;
    });
    cy.visit("/TrainerLoginPage").wait(1000);

    cy.get('input[placeholder="Username"]').type(username).wait(250);
    cy.get('input[placeholder="Password"]').type(password).wait(250);
    cy.get('button[type="submit"]').wait(250).click();

    cy.url().should("include", "/TrainerHomePage");
  });
});

describe("Trainer Home Page Tests", () => {
  before(() => {
    // User starts at home page
    cy.visit("/").wait(3000);
    cy.url().should("include", "/");

    // User navigates to Login Page via press book ws button
    cy.get('[data-cy="bookws-button-test"]').click();
    cy.location("pathname").should("eq", "/LoginPage").wait(1000);

    Cypress.session.clearAllSavedSessions();
    cy.login("trainer", "trainer");
  });

  beforeEach(() => {
    cy.session("trainerSession", () => {
      cy.login("trainer", "trainer");
    });
    cy.visit("/TrainerHomePage").wait(1000);

    // Prevent window from scrolling due to fixed position
    cy.window().then((win) => {
      win.document.body.style.cssText += `
            position: fixed;
            width: 100%;
            overflow: hidden;
          `;
    });
  });

  it("Trainer logs in successfully and Trainer Home Page rendered", () => {
    // Ensure "View Available Workshops" dropdown is visible and select an option
    cy.url().should("include", "/TrainerHomePage");
    cy.get("select#request-workshop-sel").should("be.visible");

    // Select the first workshop in the dropdown
    cy.get("select#request-workshop-sel option")
      .eq(2)
      .then((option) => {
        const workshopValue = option.val();
        cy.get("select#request-workshop-sel")
          .select(workshopValue)
          .should("have.value", workshopValue);
      });
  });

  it("Form inputs work and submit button triggers submission", () => {
    // Set the form inputs with specified values
    cy.get(".work_hours_row:nth-of-type(1) .work_hours_num_input")
      .clear()
      .type("10");
    cy.get(".work_hours_row:nth-of-type(1) .work_hours_desc_area")
      .clear()
      .type("Preparing the presentation slides");

    cy.get(".work_hours_row:nth-of-type(2) .work_hours_num_input")
      .clear()
      .type("20");
    cy.get(".work_hours_row:nth-of-type(2) .work_hours_desc_area")
      .clear()
      .type(
        "Planning the schedule and timetable of the entire workshop duration"
      );

    cy.get(".work_hours_row:nth-of-type(3) .work_hours_num_input")
      .clear()
      .type("3");
    cy.get(".work_hours_row:nth-of-type(3) .work_hours_desc_area")
      .clear()
      .type("Gathering the resources necessary for the workshop");

    cy.get(".work_hours_row:nth-of-type(4) .work_hours_num_input")
      .clear()
      .type("5");
    cy.get(".work_hours_row:nth-of-type(4) .work_hours_desc_area")
      .clear()
      .type("Training my assistants for the workshop");

    // Submit the form
    cy.get(".update-hrs-button").click();

    // Add assertions to verify that the form was submitted correctly
    // e.g., checking for a success message, or verifying a network request
  });

  it("Checks popup and data matches form inputs", () => {
    // Click on a specific workshop in the Utilisation list
    cy.get(".utilisation-scrollable-list button").first().click();

    // Verify that the popup is displayed and contains the correct data
    cy.get(".utilisation-details-popup").should("be.visible");
    cy.get(".utilisation-details-popup .util-hours").should("contain", "10");
    cy.get(".utilisation-details-popup .utilisation-details").should(
      "contain",
      "Preparing the presentation slides"
    );

    // Add additional checks for other hours and details if necessary
  });
});
