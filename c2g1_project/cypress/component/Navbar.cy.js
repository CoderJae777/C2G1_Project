import React from "react";
import { mount } from "cypress/react18";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../../src/components/NavBar";

describe("Navbar Component", () => {
  const mountComponent = () => {
    mount(
      <Router>
        <Navbar />
      </Router>
    );
  };

  it("navigates to Home Page", () => {
    mountComponent();
    cy.get(".navbarbutton").contains("Home").click();
    cy.location("pathname").should("eq", "/");
  });

  it("navigates to Our Workshops Page", () => {
    mountComponent();
    cy.get(".navbarbutton").contains("Our Workshops").click();
    cy.location("pathname").should("eq", "/OurWorkshopPage");
  });

  it("navigates to Our Trainers Page", () => {
    mountComponent();
    cy.get(".navbarbutton").contains("Our Trainers").click();
    // Define the expected path for Our Trainers page
  });

  it("navigates to Sign Up Page", () => {
    mountComponent();
    cy.get(".navbarbutton").contains("Sign Up!").click();
    cy.location("pathname").should("eq", "/SignUpPage");
  });

  it("navigates to Login Page", () => {
    mountComponent();
    cy.get(".loginbutton").contains("Log in!").click();
    cy.location("pathname").should("eq", "/LoginPage");
  });
});
