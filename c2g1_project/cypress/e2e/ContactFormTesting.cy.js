describe("Contact Form Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Contact Form Rendered Successfully", () => {
    cy.url().should("include", "/");
    cy.get(".contact_form").should("exist");
  });

  it("Testing form inputs", () => {
    // Finds the input with the placeholder "Your Name",
    // types "John Doe" into it,
    // and asserts that the value is "John Doe".
    // same for all others
    cy.get('input[placeholder="Your Name"]')
      .type("John Doe")
      .should("have.value", "John Doe");
    cy.get('input[placeholder="Your Email"]')
      .type("john.doe@example.com")
      .should("have.value", "john.doe@example.com");
    cy.get('input[placeholder="Phone Number"]')
      .type("1234567890")
      .should("have.value", "1234567890");
    cy.get('input[placeholder="Your Company"]')
      .type("Tech Co")
      .should("have.value", "Tech Co");
    cy.get("textarea")
      .type("This is a test message")
      .should("have.value", "This is a test message");
  });

  // Intercepts the POST request to the EmailJS API and mocks
  //a successful response with status 200
  // and the body { text: "OK" }.
  // The intercepted request is aliased as "sendEmail".
  it("Testing form submission", () => {
    cy.intercept("POST", "https://api.emailjs.com/api/v1.0/email/send", {
      statusCode: 200,
      body: { text: "OK" },
    }).as("sendEmail");

    cy.get('input[placeholder="Your Name"]').type("John Doe");
    cy.get('input[placeholder="Your Email"]').type("john.doe@example.com");
    cy.get('input[placeholder="Phone Number"]').type("1234567890");
    cy.get('input[placeholder="Your Company"]').type("Tech Co");
    cy.get("textarea").type("This is a test message");

    cy.get("button.sendemailbutton").click();

    cy.wait("@sendEmail").its("response.statusCode").should("eq", 200);
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Mock Email Sent Successfully");
    });
  });

  it("Testing form reset after submission", () => {
    cy.get('input[placeholder="Your Name"]').should("have.value", "");
    cy.get('input[placeholder="Your Email"]').should("have.value", "");
    cy.get('input[placeholder="Phone Number"]').should("have.value", "");
    cy.get('input[placeholder="Your Company"]').should("have.value", "");
    cy.get("textarea").should("have.value", "");
  });
});
