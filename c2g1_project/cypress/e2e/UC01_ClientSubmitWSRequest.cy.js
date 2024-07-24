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

describe("Client Home Page Test", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();

    cy.login("johndoefromjohnbrosinc", "johndoefromjohnbrosinc");
  });

  beforeEach(() => {
    cy.session("clientSession", () => {
      cy.login("johndoefromjohnbrosinc", "johndoefromjohnbrosinc");
    });

    cy.visit("/ClientHomePage");

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
    cy.get(".view-avail-ws-select").wait(500).select("0");
    cy.get(".popwsreqbut").wait(500).click();
    cy.get('input[placeholder="Select from dropdown to auto-populate Workshop ID"]')
      .should("have.value", "01")
      .wait(250);
    cy.get('input[placeholder="Select from dropdown to auto-populate Workshop Name"]')
      .should("have.value", "Intro to Python")
      .wait(250);
    cy.get('input[placeholder="Select from dropdown to auto-populate Workshop Type"]')
      .should("have.value", "Business Value Discovery")
      .wait(250);
  });

  it("Testing Form Inputs", () => {
    cy.get(".view-avail-ws-select").wait(500).select("0");
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

      cy.get('input[placeholder="Workshop Start Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .first()
        .click();

      cy.get('input[placeholder="Workshop End Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .first()
        .click();

      cy.get('textarea[placeholder="Your Message"]').type("Looking forward to the workshop!").wait(1000);
    });
  });

  it("Testing Submit Request Button and Summary Popup", () => {
    cy.get(".view-avail-ws-select").wait(500).select("0");
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

      cy.get('input[placeholder="Workshop Start Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .first()
        .click();

      cy.get('input[placeholder="Workshop End Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .next()
        .click();

      cy.get('textarea[placeholder="Your Message"]').type("Looking forward to the workshop!");
    });

    cy.get(".ws_req_submit_button").click({ force: true });

    cy.get(".summary-modal", { timeout: 20000 }).should("be.visible").wait(500);
    cy.get(".summary-buttons").within(() => {
      cy.get("button").contains("Edit Request").click();
    });
    cy.get(".summary-modal").should("not.exist").wait(500);

    cy.get(".ws_req_submit_button").click({ force: true });

    cy.get(".summary-modal", { timeout: 20000 }).should("be.visible").wait(500);

    cy.get(".summary-buttons").within(() => {
      cy.get("button").contains("Confirm Request").click();
    });

    cy.get(".summary-modal").should("not.exist");
  });

  it("Testing Clear Button Functionality", () => {
    cy.get(".view-avail-ws-select").wait(500).select("0");
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

      cy.get('input[placeholder="Workshop Start Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .first()
        .click();

      cy.get('input[placeholder="Workshop End Date"]').click().wait(500);
      cy.get('.react-datepicker').should('be.visible');
      cy.get('.react-datepicker__day--today:not(.react-datepicker__day--disabled)')
        .next()
        .click();

      cy.get('textarea[placeholder="Your Message"]').type("Looking forward to the workshop!");
    });

    cy.get(".clear-button-design").click({ force: true });

    cy.get('input[placeholder="Role at Company"]').should("have.value", "");
    cy.get('input[placeholder="Your Name"]').should("have.value", "");
    cy.get('input[placeholder="Your Email"]').should("have.value", "");
    cy.get('input[placeholder="Phone Number"]').should("have.value", "");
    cy.get('input[placeholder="Your Company"]').should("have.value", "");
    cy.get('input[placeholder="Number of Pax"]').should("have.value", "");
    cy.get('input[placeholder="Deal Size Potential in USD"]').should("have.value", "");
    cy.get('input[placeholder="Country"]').should("have.value", "");
    cy.get('input[placeholder="Venue"]').should("have.value", "");
    cy.get(".view-avail-ws-select").should("have.value", 0);
    cy.get('textarea[placeholder="Your Message"]').should("have.value", "");
    cy.get('input[placeholder="Workshop Start Date"]').should("have.value", "");
    cy.get('input[placeholder="Workshop End Date"]').should("have.value", "");
  });
});
