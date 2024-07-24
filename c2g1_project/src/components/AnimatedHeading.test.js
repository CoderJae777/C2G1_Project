import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnimatedHeading from "./AnimatedHeading";

// Clean up after each test
afterEach(() => {
  cleanup();
});

test("test: AnimatedHeading renders correctly with all text elements", () => {
  render(<AnimatedHeading />);

  // Check if the banner heading is rendered
  expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

  // Check if the static part of the heading is rendered
  expect(screen.getByText("Always")).toBeInTheDocument();

  // Check if the sliding text elements are rendered
  expect(screen.getByText("Exploring")).toBeInTheDocument();
  expect(screen.getByText("Dreaming")).toBeInTheDocument();
  expect(screen.getByText("Learning")).toBeInTheDocument();
  expect(screen.getByText("Inspiring")).toBeInTheDocument();
});
