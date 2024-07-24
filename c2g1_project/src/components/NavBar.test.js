import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";

// Mock useNavigate and useLocation from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

// Clean up after each test and clear all mocks to prevent interference between tests.
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const setupMocks = () => {
  const mockNavigate = jest.fn();
  const mockUseLocation = require("react-router-dom").useLocation;
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);
  mockUseLocation.mockReturnValue({ pathname: "/", state: null });
  return mockNavigate;
};

test("test: NavBar renders correctly and contains all navigation buttons", () => {
  setupMocks();

  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  // Check if all navigation buttons are rendered
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Our Workshops")).toBeInTheDocument();
  expect(screen.getByText("Our Trainers")).toBeInTheDocument();
  expect(screen.getByText("Contact Us")).toBeInTheDocument();
  expect(screen.getByText("Sign Up!")).toBeInTheDocument();
  expect(screen.getByText("Log in!")).toBeInTheDocument();
});

test("test: NavBar 'Home' button navigates to home page and scrolls to top", () => {
  const mockNavigate = setupMocks();

  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  // Click the 'Home' button
  fireEvent.click(screen.getByText("Home"));

  // Check if navigation to home page is called
  expect(mockNavigate).toHaveBeenCalledWith("/");
});

test("test: NavBar 'Our Workshops' button navigates to our workshops page", () => {
  const mockNavigate = setupMocks();

  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  // Click the 'Our Workshops' button
  fireEvent.click(screen.getByText("Our Workshops"));

  // Check if navigation to our workshops page is called
  expect(mockNavigate).toHaveBeenCalledWith("/OurWorkshopPage");
});

test("test: NavBar 'Our Trainers' button navigates to our trainers page", () => {
  const mockNavigate = setupMocks();

  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  // Click the 'Our Trainers' button
  fireEvent.click(screen.getByText("Our Trainers"));

  // Check if navigation to our trainers page is called
  expect(mockNavigate).toHaveBeenCalledWith("/OurTrainerPage");
});

test("test: NavBar 'Contact Us' button navigates to home page and scrolls to contact section", () => {
  const mockNavigate = setupMocks();
  const useLocation = require("react-router-dom").useLocation;
  useLocation.mockReturnValue({ pathname: "/", state: { scrollToContact: true } });

  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  // Click the 'Contact Us' button
  fireEvent.click(screen.getByText("Contact Us"));

  // Check if navigation to home page with state is called
  expect(mockNavigate).toHaveBeenCalledWith("/", { state: { scrollToContact: true } });
});

test("test: NavBar 'Sign Up!' button navigates to sign up page", () => {
  const mockNavigate = setupMocks();

  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  // Click the 'Sign Up!' button
  fireEvent.click(screen.getByText("Sign Up!"));

  // Check if navigation to sign up page is called
  expect(mockNavigate).toHaveBeenCalledWith("/SignUpPage");
});

test("test: NavBar 'Log in!' button navigates to login page", () => {
  const mockNavigate = setupMocks();

  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  // Click the 'Log in!' button
  fireEvent.click(screen.getByText("Log in!"));

  // Check if navigation to login page is called
  expect(mockNavigate).toHaveBeenCalledWith("/LoginPage");
});
