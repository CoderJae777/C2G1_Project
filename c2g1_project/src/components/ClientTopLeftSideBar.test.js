import React from "react";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import ClientTopLeftSideBar from "./ClientTopLeftSideBar";
import useAxiosGet from "../api/useAxiosGet";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../api/useAxiosGet", () => jest.fn());

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const setupMocks = () => {
  const mockNavigate = jest.fn();
  const useNavigate = require("react-router-dom").useNavigate;
  useNavigate.mockReturnValue(mockNavigate);

  const mockUseAxiosGet = {
    data: null,
    loading: false,
    error: null,
    setUrl: jest.fn(),
    setParams: jest.fn(),
    refetch: jest.fn(),
  };
  useAxiosGet.mockReturnValue(mockUseAxiosGet);

  return { mockNavigate, mockUseAxiosGet };
};

test('test: ClientTopLeftSideBar renders correctly and contains all navigation buttons', () => {
  setupMocks();
  render(
    <BrowserRouter>
      <ClientTopLeftSideBar />
    </BrowserRouter>
  );
  expect(screen.getByText("Welcome Back, (insert username here)")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("See all workshops")).toBeInTheDocument();
  // expect(screen.getByText("Settings")).toBeInTheDocument();
  expect(screen.getByText("Logout")).toBeInTheDocument();
});

test('test: ClientTopLeftSideBar "Home" button navigates to home page', () => {
  const { mockNavigate } = setupMocks();
  render(
    <BrowserRouter>
      <ClientTopLeftSideBar />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Home"));
  expect(mockNavigate).toHaveBeenCalledWith("/ClientHomePage");
});

test('test: ClientTopLeftSideBar "Logout" button calls logout endpoint and navigates to home page on success', async () => {
  const { mockNavigate, mockUseAxiosGet } = setupMocks();

  render(
    <BrowserRouter>
      <ClientTopLeftSideBar />
    </BrowserRouter>
  );

  await act(async () => {
    fireEvent.click(screen.getByText("Logout"));
  });

  expect(mockUseAxiosGet.setUrl).toHaveBeenCalledWith(expect.stringContaining("logout"));
  expect(mockUseAxiosGet.refetch).toHaveBeenCalled();

  mockUseAxiosGet.data = { status: true };

  await act(async () => {
    mockUseAxiosGet.refetch();
  });

  render(
    <BrowserRouter>
      <ClientTopLeftSideBar />
    </BrowserRouter>
  );

  expect(mockNavigate).toHaveBeenCalledWith("/");
});
