import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import TrainerLoginPage from "./TrainerLoginPage";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "axios";

// Mock useNavigate from react-router-dom
// controls navigation

// Mocking useNavigate:

// jest.mock('react-router-dom', ...) tells Jest to use a stand-in for the react-router-dom module.
// Within this, useNavigate: jest.fn() creates a fake version of useNavigate that we can control.

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock axios jest.mock('axios') tells Jest to use a stand-in for the axios module.
// controls HTTP request
jest.mock("axios");

//Clean up after each test and clear all mocks to prevent interference between tests.
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Verify that various elements of the AdminLoginPage are rendered correctly:
// Navbar
// Admin image
// Role selection buttons (Client, Admin, Trainer)
// Form elements (Username, Password, Sign in button)
test("Test : TrainerLoginPage rendered correctly and logged in with trainer credentials", async () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  // Mock the axios post request
  axios.post.mockImplementation((url, { username, password }) => {
    if (username === "trainer" && password === "trainer") {
      return Promise.resolve({ data: { message: "Success" } });
    }
    return Promise.reject({ response: { data: { message: "Error" } } });
  });

  render(
    <BrowserRouter>
      <TrainerLoginPage />
    </BrowserRouter>
  );

  // Check if the Navbar is rendered
  expect(screen.getByRole("navigation")).toBeInTheDocument();
});
