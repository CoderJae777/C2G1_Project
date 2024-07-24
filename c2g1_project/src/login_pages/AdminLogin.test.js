import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import AdminLoginPage from "./AdminLoginPage";
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
test("Test : AdminLoginPage rendered correctly and logged in with admin credentials", async () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  // Mock the axios post request
  axios.post.mockImplementation((url, { username, password }) => {
    if (username === "admin" && password === "admin") {
      return Promise.resolve({ data: { message: "Success" } });
    }
    return Promise.reject({ response: { data: { message: "Error" } } });
  });

  render(
    <BrowserRouter>
      <AdminLoginPage />
    </BrowserRouter>
  );

  // Check if the Navbar is rendered
  expect(screen.getByRole("navigation")).toBeInTheDocument();

  // Check if the admin image is rendered
  const adminImage = screen.getByAltText("adminimg");
  expect(adminImage).toBeInTheDocument();

  // Check if the role selection buttons are rendered
  expect(screen.getByText(/Pick your role/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Client/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Admin/i })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /Trainer/i })).toBeInTheDocument();

  // Check if the form elements are rendered
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Sign in/i })).toBeInTheDocument();

  // Simulate user input
  // this is like cypress equivalent of .type
  fireEvent.change(screen.getByPlaceholderText(/Username/i), {
    target: { value: "admin" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "admin" },
  });

  // Submit the form
  // cypress equivalent of .click
  fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

  // Wait for the axios post request to be called and verify navigation
  await screen.findByText(/Need an account\? Sign Up!/i); // Ensures the DOM updates after submission

  // await screen.findByText waits for the DOM to update after form submission, 
  //ensuring the component has processed the form data.
  expect(mockNavigate).toHaveBeenCalledWith("/AdminHomePage");

  //By mocking axios and useNavigate, we can simulate the login process and 
  // verify that the form submission with the correct credentials results in 
  // navigation to the admin home page. The test confirms that the login process works 
  //correctly with the username and password both set to 'admin'.
});



// Jest and mocking purpose : 

// Component Rendering:

// Ensuring that all the elements (e.g., input fields, buttons) render correctly.
// User Interaction:

// Simulating user actions like typing into input fields and clicking buttons.
// Component Behavior:

// Verifying how the component behaves in response to user actions and simulated backend responses.
// Ensuring the correct navigation happens on successful login (based on mock data).

//////////////// NOT INTEGRATION TESTING - that one cypress, which u have already done