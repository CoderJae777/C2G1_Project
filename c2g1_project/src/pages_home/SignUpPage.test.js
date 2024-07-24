import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import SignUpPage from "./SignUpPage";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the useAxiosPost hook
jest.mock("../api/useAxiosPost", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock window.alert
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

// Clean up after each test and clear all mocks to prevent interference between tests.
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  mockAlert.mockClear(); // Clear the mock alert after each test
});

test("SignUpPage renders correctly and allows form submission", () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  const { setBody, refetch } = require("../api/useAxiosPost").default.mockReturnValue({
    data: null,
    loading: false,
    error: null,
    setBody: jest.fn(),
    refetch: jest.fn(),
  });

  render(
    <BrowserRouter>
      <SignUpPage />
    </BrowserRouter>
  );

  // Check if the Navbar is rendered
  expect(screen.getByRole("navigation")).toBeInTheDocument();

  // Check if form fields are rendered
  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Fullname")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByText("-- Country --")).toBeInTheDocument();

  // Fill the form
  fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "jest_test_user" } });
  fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "jest_test_user" } });
  fireEvent.change(screen.getByPlaceholderText("Fullname"), { target: { value: "Jest Test User" } });
  fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "jesttestuser@example.com" } });
  fireEvent.change(screen.getByText("-- Country --"), { target: { value: "USA" } });

  // Check to see if form is filled correctly
  expect(screen.getByPlaceholderText("Username").value).toBe("jest_test_user");
  expect(screen.getByPlaceholderText("Password").value).toBe("jest_test_user");
  expect(screen.getByPlaceholderText("Fullname").value).toBe("Jest Test User");
  expect(screen.getByPlaceholderText("Email").value).toBe("jesttestuser@example.com");
  expect(screen.getByText("-- Country --").value).toBe("USA");

  // Submit the form
  fireEvent.click(screen.getByText("Register"));

  // Check if refetch function is called to trigger the POST request
  expect(refetch).toHaveBeenCalled();

  // Test the navigation after successful sign-up
  expect(mockNavigate).toHaveBeenCalledWith("/ClientLoginPage");
});

test("shows error alert when form fields are empty", () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  const { setBody, refetch } = require("../api/useAxiosPost").default.mockReturnValue({
    data: null,
    loading: false,
    error: null,
    setBody: jest.fn(),
    refetch: jest.fn(),
  });

  render(
    <BrowserRouter>
      <SignUpPage />
    </BrowserRouter>
  );

  // Submit the form without filling it
  fireEvent.click(screen.getByText("Register"));

  // Check for the alert message
  expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("Please enter the value for the following:"));
  expect(setBody).not.toHaveBeenCalled();
  expect(refetch).not.toHaveBeenCalled();
});
