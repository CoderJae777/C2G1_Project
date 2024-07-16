describe("NavBar Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Home Page Rendered Successfully", () => {
    cy.url().should("include", "/").wait(1000);
  });

  it("Testing navigation to Our WorkShop Page", () => {
    cy.get('[data-cy="ourwspage-button"]').click();
    cy.location("pathname").should("eq", "/OurWorkshopPage").wait(2000);
  });

  it("Testing navigation to Our Trainer Page", () => {
    cy.get('[data-cy="ourtrpage-button"]').click();
    cy.location("pathname").should("eq", "/OurTrainerPage").wait(2000);
  });

  it("Testing navigation to Sign Up Page", () => {
    cy.get('[data-cy="signuppg-button"]').click();
    cy.location("pathname").should("eq", "/SignUpPage").wait(1000);
  });

  
  it("Testing navigation to Log In Page", () => {
    cy.get('[data-cy="loginpg-button"]').click();
    cy.location("pathname").should("eq", "/LoginPage").wait(1000);
  });

  it("Testing navigation to Client Login Page", () => {
    cy.visit('/LoginPage')
    cy.get('[data-cy="clientlogin-button"]').click();
    cy.location("pathname").should("eq", "/ClientLoginPage").wait(1000);
  });

  it("Testing navigation to Trainer Login Page", () => {
    cy.visit('/LoginPage')
    cy.get('[data-cy="trainerlogin-button"]').click();
    cy.location("pathname").should("eq", "/TrainerLoginPage").wait(1000);
  });

  it("Testing navigation to Admin Login Page", () => {
    cy.visit('/LoginPage')
    cy.get('[data-cy="adminlogin-button"]').click();
    cy.location("pathname").should("eq", "/AdminLoginPage").wait(1000);
  });

});
