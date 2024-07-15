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
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-cy="h2-test"]').contains('Grow your skills with Dell Academy!');
  });
});

