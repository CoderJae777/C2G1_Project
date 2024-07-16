// use this for learning
// spec file for cypress.io

// ##################################################
// describe block --> all the test will exist in a describe block
// takes 2 args :
// 1) a string that describes your test file
// 2) a callback function that has your tests
// literally describes what this test blocks gonna test

// ##################################################
// it block --> a single/ individual test within an overall test file
// takes 2 args :
// 1) a string that describes the test
// 2) a callback function that has your tests

// ##################################################
// commands for cy object
// cy.vist('/') will navigate the cypress to your home page
// cy.click()
// cy.type()
// cy.check()
// cy.dblclick()
// cy.rightclick() etc etc

// ##################################################
// const button = cy.get("button")
// button.click() will NOT work --> cypress commands are async and get queued
// for execution at a later time

describe("Home Page Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Home Page Rendered Successfully", () => {
    cy.url().should("include", "/");
  });

  it("Testing all headings", () => {
    cy.get('[data-cy="h2-test"]').should(
      "contain.text",
      "Grow your skills with Dell Academy!"
    );
  });

  it("Testing Buttons functionality", () => {
    cy.get('[data-cy="bookws-button-test"]').click();
    cy.location("pathname").should("eq", "/LoginPage");

    cy.visit("/");
    cy.get('[data-cy="ws-button-test"]').click();
    cy.location("pathname").should("eq", "/OurWorkshopPage");
  });

  it("Testing all components", () => {
    // Add your component tests here
  });

  it("Testing Scrolling Animations", () => {
    cy.get('[data-cy="bottom-of-homepage"]').scrollIntoView({ duration: 5000 });
  });
});
