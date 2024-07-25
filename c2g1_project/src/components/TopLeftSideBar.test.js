import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import TopLeftSideBar from "./TopLeftSideBar";
import useAxiosGet from "../api/useAxiosGet";

// Mock useNavigate and useAxiosGet from react-router-dom and custom hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../api/useAxiosGet", () => jest.fn());

// Clean up after each test and clear all mocks to prevent interference between tests.
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const setupMocks = () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  useAxiosGet.mockReturnValue({
    data: null,
    loading: false,
    error: null,
    setUrl: jest.fn(),
    setParams: jest.fn(),
    refetch: jest.fn(),
  });

  return mockNavigate;
};

test("test: TopLeftSideBar renders correctly and contains all navigation buttons", () => {
  setupMocks();
  render(
    <BrowserRouter>
      <TopLeftSideBar hasNewRequests={false} />
    </BrowserRouter>
  );
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Profile")).toBeInTheDocument();
  expect(screen.getByText("Workshop Requests")).toBeInTheDocument();
  expect(screen.getByText("Manage Trainers")).toBeInTheDocument();
  expect(screen.getByText("Manage Workshops")).toBeInTheDocument();
  expect(screen.getByText("Settings")).toBeInTheDocument();
  expect(screen.getByText("Logout")).toBeInTheDocument();
});

test("test: TopLeftSideBar 'Home' button navigates to home page", () => {
  const mockNavigate = setupMocks();
  render(
    <BrowserRouter>
      <TopLeftSideBar hasNewRequests={false} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Home"));
  expect(mockNavigate).toHaveBeenCalledWith("/AdminHomePage");
});

test("test: TopLeftSideBar 'Profile' button navigates to profile page", () => {
  const mockNavigate = setupMocks();
  render(
    <BrowserRouter>
      <TopLeftSideBar hasNewRequests={false} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Profile"));
  expect(mockNavigate).toHaveBeenCalledWith("/ProfilePage");
});

test("test: TopLeftSideBar 'Workshop Requests' button navigates to workshop requests page", () => {
  const mockNavigate = setupMocks();
  render(
    <BrowserRouter>
      <TopLeftSideBar hasNewRequests={false} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Workshop Requests"));
  expect(mockNavigate).toHaveBeenCalledWith("/AdminWorkshopRequestPage");
});

test("test: TopLeftSideBar 'Manage Trainers' button navigates to manage trainers page", () => {
  const mockNavigate = setupMocks();
  render(
    <BrowserRouter>
      <TopLeftSideBar hasNewRequests={false} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Manage Trainers"));
  expect(mockNavigate).toHaveBeenCalledWith("/AdminManageTrainerPage");
});

test("test: TopLeftSideBar 'Manage Workshops' button navigates to manage workshops page", () => {
  const mockNavigate = setupMocks();
  render(
    <BrowserRouter>
      <TopLeftSideBar hasNewRequests={false} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Manage Workshops"));
  expect(mockNavigate).toHaveBeenCalledWith("/AdminManageWorkshopPage");
});

test("test: TopLeftSideBar 'Logout' button calls logout endpoint", () => {
  const mockNavigate = setupMocks();

  render(
    <BrowserRouter>
      <TopLeftSideBar hasNewRequests={false} />
    </BrowserRouter>
  );

  const { setUrl, refetch } = useAxiosGet.mock.results[0].value;

  fireEvent.click(screen.getByText("Logout"));
  expect(setUrl).toHaveBeenCalledWith(expect.stringContaining("logout"));
  expect(refetch).toHaveBeenCalled();
});
