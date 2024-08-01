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
    cy.visit("/").wait(1500);
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
    // Ensure "View Available Workshops" dropdown is visible and options are loaded
    cy.url().should("include", "/TrainerHomePage");
    cy.get("select#request-workshop-sel").should("be.visible");
  });

  it("Form inputs work and submit button triggers submission", () => {
    // Wait for the dropdown options to be populated
    cy.get("select#request-workshop-sel option").should(
      "have.length.greaterThan",
      1
    );

    // Select the first actual workshop option (not the placeholder)
    cy.get("select#request-workshop-sel")
      .select(1)
      .should("not.have.value", "Workshop");
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
    cy.get(".utilisation-scrollable-list button").first().click();

    cy.get('[data-cy="trwsuhd-popup"]').should("be.visible");
    cy.get('[data-cy="trwsuhd-popup"] .details-table td').contains(
      "Workshop ID:"
    );
    cy.get('[data-cy="trwsuhd-popup"] .details-table td').contains(
      "Utilisation Hours 1:"
    );
    cy.get('[data-cy="trwsuhd-popup"] .details-table td').contains("10");
    cy.get('[data-cy="trwsuhd-popup"] .details-table td').contains(
      "Preparing the presentation slides"
    ).wait(3000);

    // Additional checks for other utilisation details can be added here

    cy.get('[data-cy="trwsuhd-close-button"]').click();
    cy.get('[data-cy="trwsuhd-popup"]').should("not.exist");
  });
});
