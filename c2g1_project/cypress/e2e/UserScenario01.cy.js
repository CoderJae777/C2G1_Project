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
    cy.visit("/").wait(1500);
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
    cy.get(".view-avail-ws-select").should("be.visible").select("0").wait(300);

    // Auto populates the workshop
    cy.get(".popwsreqbut").should("be.visible").wait(500).click().wait(500);

    // Fill out the form
    cy.get("form").within(() => {
      cy.get('input[placeholder="Role at Company"]')
        .type("President")
        .wait(300);
      cy.get('input[placeholder="Your Name"]').type("John Doe").wait(300);
      cy.get('input[placeholder="Your Email"]')
        .type("john.doe@gmail.com")
        .wait(300);
      cy.get('input[placeholder="Phone Number"]').type("1234567890").wait(300);
      cy.get('input[placeholder="Your Company"]')
        .type("Doe Enterprises")
        .wait(300);
      cy.get('select[title="Select the number of participants"]')
        .should("be.visible")
        .select("10 - 20");

      cy.get('input[placeholder="Deal Size Potential in USD"]')
        .type("1000")
        .wait(300);
      cy.get('input[placeholder="Country"]').type("USA").wait(300);
      cy.get('input[placeholder="Venue"]').type("Central Hall").wait(300);

      cy.get('input[placeholder="Workshop Start Date"]').click().wait(300);
      cy.get(".react-datepicker").should("be.visible");
      cy.get(
        ".react-datepicker__day--today:not(.react-datepicker__day--disabled)"
      )
        .first()
        .click();

      cy.get('input[placeholder="Workshop End Date"]').click().wait(300);
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

    cy.get(".summary-modal").should("not.exist").wait(1500);
  });

  it("Click on recently submitted workshop request and verify the details", () => {
    // Check that the list of requests is visible and click on the first request
    cy.get(".scrollable-list .workshop-detail-panel").first().click();

    // Ensure the popup is visible with a custom timeout in case of delay
    cy.get('[data-cy="clwsrqd-popup"]', { timeout: 10000 }).should(
      "be.visible"
    ).wait(2000);

    // Verify the contents of the popup
    cy.get('[data-cy="clwsrqd-popup"] .details-table').within(() => {
      cy.get("tr")
        .eq(0)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Workshop ID:");
          cy.get("td").eq(1).should("have.text", "WR0001");
        });
      cy.get("tr")
        .eq(1)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Client Company:");
          cy.get("td").eq(1).should("have.text", "Doe Enterprises");
        });
      cy.get("tr")
        .eq(2)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Client Name:");
          cy.get("td").eq(1).should("have.text", "John Doe");
        });
      cy.get("tr")
        .eq(3)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Client Role:");
          cy.get("td").eq(1).should("have.text", "President");
        });
      cy.get("tr")
        .eq(4)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Client Email:");
          cy.get("td").eq(1).should("have.text", "john.doe@gmail.com");
        });
      cy.get("tr")
        .eq(5)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Client Phone Number:");
          cy.get("td").eq(1).should("have.text", "1234567890");
        });
      cy.get("tr")
        .eq(6)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Start Date:");
          cy.get("td").eq(1).should("have.text", '2024-07-31T16:00:00.000Z'); // 01/08/2024
        });
      cy.get("tr")
        .eq(7)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "End Date:");
          cy.get("td").eq(1).should("have.text", "2024-08-01T16:00:00.000Z"); // 02/08/2024
        });
      cy.get("tr")
        .eq(8)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Deal Size:");
          cy.get("td").eq(1).should("have.text", "100000");
        });
      cy.get("tr")
        .eq(9)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Country:");
          cy.get("td").eq(1).should("have.text", "USA");
        });
      cy.get("tr")
        .eq(10)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Venue:");
          cy.get("td").eq(1).should("have.text", "Central Hall");
        });
      cy.get("tr")
        .eq(11)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Attendees:");
          cy.get("td").eq(1).should("have.text", "10-20");
        });
      cy.get("tr")
        .eq(12)
        .within(() => {
          cy.get("td").eq(0).should("have.text", "Message:");
          cy.get("td")
            .eq(1)
            .should("have.text", "Looking forward to the workshop!");
        });
    });

    // Close the popup
    cy.get('[data-cy="clwsrqd-close-button"]').click();
    cy.get('[data-cy="clwsrqd-popup"]').should("not.exist");
  });
});
