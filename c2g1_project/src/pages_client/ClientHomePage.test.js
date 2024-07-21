// ClientHomePage.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ClientHomePage from "../pages_client/ClientHomePage";
import { BrowserRouter as Router } from "react-router-dom"; // Router component from react-router-dom for handling routes in tests.
// Custom hooks for making GET and POST requests.
import useAxiosGet from "../api/useAxiosGet";
import useAxiosPost from "../api/useAxiosPost";
// Ensure this import is here for the matchers
import "@testing-library/jest-dom";

// jest.mock: Mocks the implementation of the useAxiosGet and useAxiosPost
// hooks to prevent actual network requests.
jest.mock("../api/useAxiosGet");
jest.mock("../api/useAxiosPost");

// mockVerifyData: Mock data returned by
// the useAxiosGet hook when the "verify" endpoint is called.
const mockVerifyData = {
  data: { id: 1, role: "client" },
  loading: false,
  error: null,
};

// Start of ClientHomePage test suite
// beforeEach: Runs before each test to set up the mock implementations for useAxiosGet and useAxiosPost.
// useAxiosGet: Returns mockVerifyData if the URL contains "verify", otherwise returns an empty data array.
// useAxiosPost: Returns mocked setBody and refetch functions.

describe("UC01 ClientHomePage Test", () => {
  beforeEach(() => {
    useAxiosGet.mockImplementation((url) => {
      if (url.includes("verify")) {
        return mockVerifyData;
      }
      return { data: [], loading: false, error: null };
    });

    useAxiosPost.mockImplementation(() => ({
      setBody: jest.fn(),
      refetch: jest.fn(),
    }));
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////
  // test: Checks if the Client Home Page is rendered.
  ////////////////////////////////////////////
  test("Test : Client Homme Page is Rendered", async () => {
    render(
      <Router>
        <ClientHomePage />
      </Router>
    );
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////
  // test: Checks if the dropdown is rendered.
  ////////////////////////////////////////////
  test("Test : Workshop Availability dropdown is rendered", async () => {
    render(
      <Router>
        <ClientHomePage />
      </Router>
    );

    const dropdown = screen.getByPlaceholderText("Click to view workshops");
    expect(dropdown).toBeInTheDocument();
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////
  // test: Checks if the form is rendered.
  ////////////////////////////////////////
  test("Test : Auto fill inputs, form is working and inputs are reflected", () => {
    render(
      <Router>
        <ClientHomePage />
      </Router>
    );

    const roleInput = screen.getByPlaceholderText("Role at Company");
    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const phoneInput = screen.getByPlaceholderText("Phone Number");
    const companyInput = screen.getByPlaceholderText("Your Company");
    const paxInput = screen.getByPlaceholderText("Number of Pax");
    const dealInput = screen.getByPlaceholderText("Deal Size Potential in USD");
    const countryInput = screen.getByPlaceholderText("Country");
    const venueInput = screen.getByPlaceholderText("Venue");
    const messageInput = screen.getByPlaceholderText("Your Message");

    // fireevent is the cypress equivalent of cy.
    fireEvent.change(roleInput, { target: { value: "Manager" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(companyInput, { target: { value: "Tech Co." } });
    fireEvent.change(paxInput, { target: { value: "50" } });
    fireEvent.change(dealInput, { target: { value: "10000" } });
    fireEvent.change(countryInput, { target: { value: "USA" } });
    fireEvent.change(venueInput, { target: { value: "New York" } });
    fireEvent.change(messageInput, {
      target: { value: "Looking forward to it." },
    });

    expect(roleInput.value).toBe("Manager");
    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john.doe@example.com");
    expect(phoneInput.value).toBe("1234567890");
    expect(companyInput.value).toBe("Tech Co.");
    expect(paxInput.value).toBe("50");
    expect(dealInput.value).toBe("10000");
    expect(countryInput.value).toBe("USA");
    expect(venueInput.value).toBe("New York");
    expect(messageInput.value).toBe("Looking forward to it.");
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////
  // test: Checks if the summary popup is rendered.
  /////////////////////////////////////////////////
  test("Test : Summary popup is rendered on submit request button click", async () => {
    render(
      <Router>
        <ClientHomePage />
      </Router>
    );
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  // test: Checks if the details input are reflected in the summary popup.
  ////////////////////////////////////////////////////////////////////////
  test("Test : Summary popup is rendered on submit request button click", async () => {
    render(
      <Router>
        <ClientHomePage />
      </Router>
    );
    const roleInput = screen.getByPlaceholderText("Role at Company");
    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const phoneInput = screen.getByPlaceholderText("Phone Number");
    const companyInput = screen.getByPlaceholderText("Your Company");
    const paxInput = screen.getByPlaceholderText("Number of Pax");
    const dealInput = screen.getByPlaceholderText("Deal Size Potential in USD");
    const countryInput = screen.getByPlaceholderText("Country");
    const venueInput = screen.getByPlaceholderText("Venue");
    const messageInput = screen.getByPlaceholderText("Your Message");

    fireEvent.change(roleInput, { target: { value: "Manager" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(companyInput, { target: { value: "Tech Co." } });
    fireEvent.change(paxInput, { target: { value: "50" } });
    fireEvent.change(dealInput, { target: { value: "10000" } });
    fireEvent.change(countryInput, { target: { value: "USA" } });
    fireEvent.change(venueInput, { target: { value: "New York" } });
    fireEvent.change(messageInput, {
      target: { value: "Looking forward to it." },
    });

    fireEvent.click(screen.getByText("Submit Request"));

    await waitFor(() => {
      expect(
        screen.getByText("Summary of Workshop Request")
      ).toBeInTheDocument();
      expect(screen.getByText("Confirm Request")).toBeInTheDocument();
      expect(screen.getByText("Edit Request")).toBeInTheDocument();

      // making sure summary details are what is keyed in

      expect(roleInput.value).toBe("Manager");
      expect(nameInput.value).toBe("John Doe");
      expect(emailInput.value).toBe("john.doe@example.com");
      expect(phoneInput.value).toBe("1234567890");
      expect(companyInput.value).toBe("Tech Co.");
      expect(paxInput.value).toBe("50");
      expect(dealInput.value).toBe("10000");
      expect(countryInput.value).toBe("USA");
      expect(venueInput.value).toBe("New York");
      expect(messageInput.value).toBe("Looking forward to it.");
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////
  // test: Checks if the summary popup is closed on edit button click.
  ////////////////////////////////////////////////////////////////////
  test("Test : Edit Button works in summary popup", async () => {
    render(
      <Router>
        <ClientHomePage />
      </Router>
    );

    const roleInput = screen.getByPlaceholderText("Role at Company");
    fireEvent.change(roleInput, { target: { value: "Manager" } });
    fireEvent.click(screen.getByText("Submit Request"));

    await waitFor(() => {
      expect(
        screen.getByText("Summary of Workshop Request")
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Edit Request"));

    await waitFor(() => {
      expect(
        screen.queryByText("Summary of Workshop Request")
      ).not.toBeInTheDocument();
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////
  // test: Checks if Confirm submit button from summary request works
  ////////////////////////////////////////////////////////////////////

  test("Test : Confirm Button works in summary popup", async () => {
    render(
      <Router>
        <ClientHomePage />
      </Router>
    );

    const roleInput = screen.getByPlaceholderText("Role at Company");
    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const phoneInput = screen.getByPlaceholderText("Phone Number");
    const companyInput = screen.getByPlaceholderText("Your Company");
    const paxInput = screen.getByPlaceholderText("Number of Pax");
    const dealInput = screen.getByPlaceholderText("Deal Size Potential in USD");
    const countryInput = screen.getByPlaceholderText("Country");
    const venueInput = screen.getByPlaceholderText("Venue");
    const messageInput = screen.getByPlaceholderText("Your Message");

    fireEvent.change(roleInput, { target: { value: "Manager" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(companyInput, { target: { value: "Tech Co." } });
    fireEvent.change(paxInput, { target: { value: "50" } });
    fireEvent.change(dealInput, { target: { value: "10000" } });
    fireEvent.change(countryInput, { target: { value: "USA" } });
    fireEvent.change(venueInput, { target: { value: "New York" } });
    fireEvent.change(messageInput, {
      target: { value: "Looking forward to it." },
    });
    fireEvent.click(screen.getByText("Submit Request"));

    await waitFor(() => {
      expect(
        screen.getByText("Summary of Workshop Request")
      ).toBeInTheDocument();
    });

    // fireEvent.click(screen.getByText("Confirm Request"));

    // await waitFor(() => {
    //   expect(
    //     screen.queryByText("Summary of Workshop Request")
    //   ).not.toBeInTheDocument();
    // });
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////
  // test: Checks if clear button works
  ////////////////////////////////////////////////////////////////////

  test("Test : Clear button works and clears all inputs", async () => {
    render(
      <Router>
        <ClientHomePage />
      </Router>
    );

    const roleInput = screen.getByPlaceholderText("Role at Company");
    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const phoneInput = screen.getByPlaceholderText("Phone Number");
    const companyInput = screen.getByPlaceholderText("Your Company");
    const paxInput = screen.getByPlaceholderText("Number of Pax");
    const dealInput = screen.getByPlaceholderText("Deal Size Potential in USD");
    const countryInput = screen.getByPlaceholderText("Country");
    const venueInput = screen.getByPlaceholderText("Venue");
    const messageInput = screen.getByPlaceholderText("Your Message");

    fireEvent.change(roleInput, { target: { value: "Manager" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(companyInput, { target: { value: "Tech Co." } });
    fireEvent.change(paxInput, { target: { value: "50" } });
    fireEvent.change(dealInput, { target: { value: "10000" } });
    fireEvent.change(countryInput, { target: { value: "USA" } });
    fireEvent.change(venueInput, { target: { value: "New York" } });
    fireEvent.change(messageInput, {
      target: { value: "Looking forward to it." },
    });

    fireEvent.click(screen.getByText("Clear"));

    // Check if the fields are cleared
    await waitFor(() => {
      expect(roleInput.value).toBe("");
      expect(nameInput.value).toBe("");
      expect(emailInput.value).toBe("");
      expect(phoneInput.value).toBe("");
      expect(companyInput.value).toBe("");
      expect(paxInput.value).toBe("");
      expect(dealInput.value).toBe("");
      expect(countryInput.value).toBe("");
      expect(venueInput.value).toBe("");
      expect(messageInput.value).toBe("");
    });
  });
});
