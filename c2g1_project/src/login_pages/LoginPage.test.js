import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import LoginPage from "./LoginPage";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Clean up after each test and clear all mocks to prevent interference between tests.
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Verify that the LoginPage renders correctly
test("Test: Renders everything in LoginPage correctly", async () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  // Check if the Navbar is rendered
  expect(screen.getByRole("navigation")).toBeInTheDocument();

  // Check if the Dell logo is rendered
  const dellLogo = screen.getByAltText("logo");
  expect(dellLogo).toBeInTheDocument();
  expect(dellLogo.src).toContain("DellAcademy.png");

  // Check if role selection buttons are rendered
  expect(screen.getByText("Client")).toBeInTheDocument();
  expect(screen.getByText("Admin")).toBeInTheDocument();
  expect(screen.getByText("Trainer")).toBeInTheDocument();

  // Check if the form elements are rendered
  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByText("Sign in")).toBeInTheDocument();

  // Check if the signup text is rendered
  expect(screen.getByText("Need an account? Sign Up!")).toBeInTheDocument();

  // Check if the forget password text is rendered
  expect(screen.getByText("Forget password")).toBeInTheDocument();
});

// Test Dell Logo image is shown
test("Test: Dell logo image is rendered", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  const dellLogo = screen.getByAltText("logo");
  expect(dellLogo).toBeInTheDocument();
  expect(dellLogo.src).toContain("DellAcademy.png");
});

// Test Client button navigation
test("Test: Client button navigates to ClientLoginPage", () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("Client"));
  expect(mockNavigate).toHaveBeenCalledWith("/ClientLoginPage");
});

// Test Admin button navigation
test("Test: Admin button navigates to AdminLoginPage", () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("Admin"));
  expect(mockNavigate).toHaveBeenCalledWith("/AdminLoginPage");
});

// Test Trainer button navigation
test("Test: Trainer button navigates to TrainerLoginPage", () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("Trainer"));
  expect(mockNavigate).toHaveBeenCalledWith("/TrainerLoginPage");
});

// Test SignUp button navigation
test("Test: SignUp text navigates to SignUpPage", () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("Need an account? Sign Up!"));
  expect(mockNavigate).toHaveBeenCalledWith("/SignUpPage");
});


