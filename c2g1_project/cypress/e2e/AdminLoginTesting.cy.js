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
    cy.visit("/AdminLoginPage").wait(2000); // Adjust the routes to match the login page

    // Enter the login credentials and submit the form
    cy.get('input[placeholder="Username"]').type(username).wait(500);
    cy.get('input[placeholder="Password"]').type(password).wait(500);
    cy.get('button[type="submit"]').wait(500).click();

    cy.url().should("include", "/AdminHomePage");
  });
});

describe("Admin Home Page Test", () => {
  // Log in once before all tests and SAVE THE MFKING SESSION (V IMPORTANT)
  before(() => {
    // Clear all sessions before making a new one
    Cypress.session.clearAllSavedSessions();

    cy.login("admin", "admin"); 
  });

  // Every test should start retrieving the session that is created by BEFORE()
  // then visit ClientHomePage
  beforeEach(() => {
    cy.session("adminsession", () => {
      cy.login("admin", "admin");
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
});
