import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

// Clean up after each test
afterEach(() => {
  cleanup();
});

test("test: Footer renders correctly with all sections and links", () => {
  render(<Footer />);

  // Check if the footer container is rendered
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();

  // Check for section headings
  expect(screen.getByText("Our Offerings")).toBeInTheDocument();
  expect(screen.getByText("Account")).toBeInTheDocument();
  expect(screen.getByText("Support")).toBeInTheDocument();
  expect(screen.getByText("Our Company")).toBeInTheDocument();
  expect(screen.getByText("Resources")).toBeInTheDocument();

  // Check for links under 'Our Offerings'
  expect(screen.getByText("Artificial Intelligence")).toBeInTheDocument();
  expect(screen.getByText("Products")).toBeInTheDocument();
  expect(screen.getByText("Solutions")).toBeInTheDocument();
  expect(screen.getByText("Services")).toBeInTheDocument();
  expect(screen.getByText("Deals")).toBeInTheDocument();

  // Check for links under 'Account'
  expect(screen.getByText("My Account")).toBeInTheDocument();
  expect(screen.getByText("Order Status")).toBeInTheDocument();
  expect(screen.getByText("Profile Settings")).toBeInTheDocument();
  expect(screen.getByText("My Products")).toBeInTheDocument();
  expect(screen.getByText("Dell Rewards Balance")).toBeInTheDocument();

  // Check for links under 'Support'
  expect(screen.getByText("Support Home")).toBeInTheDocument();
  expect(screen.getByText("Contact Technical Support")).toBeInTheDocument();
  expect(screen.getByText("Returns")).toBeInTheDocument();

  // Check for links under 'Our Company'
  expect(screen.getByText("Who We Are")).toBeInTheDocument();
  expect(screen.getByText("Careers")).toBeInTheDocument();
  expect(screen.getByText("Dell Technologies Capital")).toBeInTheDocument();
  expect(screen.getByText("Investors")).toBeInTheDocument();
  expect(screen.getByText("Newsroom")).toBeInTheDocument();
  expect(screen.getByText("Perspectives")).toBeInTheDocument();
  expect(screen.getByText("Recycling")).toBeInTheDocument();

  // Check for links under 'Resources'
  expect(screen.getByText("Blog")).toBeInTheDocument();
  expect(screen.getByText("Dell Rewards")).toBeInTheDocument();
  expect(screen.getByText("Events")).toBeInTheDocument();
  expect(screen.getByText("Email Sign-Up")).toBeInTheDocument();
  expect(screen.getByText("Privacy Centre")).toBeInTheDocument();
  expect(screen.getByText("Resource Library")).toBeInTheDocument();
  expect(screen.getByText("Security & Trust Centre")).toBeInTheDocument();

  // Check for footer bottom links
  expect(screen.getByText("Terms of Use")).toBeInTheDocument();
  expect(screen.getByText("Privacy Policy")).toBeInTheDocument();

  // Check for footer copyright
  expect(screen.getByText("Copyright © 2024 Dell Inc.")).toBeInTheDocument();
});
