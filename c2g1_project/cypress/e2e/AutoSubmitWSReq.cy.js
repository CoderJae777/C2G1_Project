Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    cy.window().then((win) => {
      win.document.body.style.cssText += `
          position: fixed;
          width: 100%;
          overflow: hidden;
        `;
    });
    cy.visit("/ClientLoginPage");

    cy.get('input[placeholder="Username"]').type(username);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('button[type="submit"]').click();

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

  it("Auto Submitting WS Request", () => {
    cy.get(".view-avail-ws-select").select("0");
    cy.get(".popwsreqbut").click();

    cy.get("form").within(() => {
      cy.get('input[placeholder="Role at Company"]').type("President");
      cy.get('input[placeholder="Your Name"]').type("johndoefromjohnbrosinc");
      cy.get('input[placeholder="Your Email"]').type("john.doe@gmail.com");
      cy.get('input[placeholder="Phone Number"]').type(1234567890);
      cy.get('input[placeholder="Your Company"]').type("John Doe & Bros Enterprises");
      cy.get('input[placeholder="Number of Pax"]').type(10);
      cy.get('input[placeholder="Deal Size Potential in USD"]').type(100000);
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

    cy.get(".ws_req_submit_button").click();

    cy.get(".summary-modal", { timeout: 20000 }).should("be.visible");

    cy.get(".summary-buttons").within(() => {
      cy.get("button").contains("Confirm Request").click();
    });

    cy.get(".summary-modal").should("not.exist");
  });
});
