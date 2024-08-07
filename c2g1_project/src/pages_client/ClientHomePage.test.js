// ClientHomePage.test.js
import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import ClientHomePage from "../pages_client/ClientHomePage";
import { BrowserRouter as Router } from "react-router-dom"; // Router component from react-router-dom for handling routes in tests.
// Custom hooks for making GET and POST requests.
import useAxiosGet from "../api/useAxiosGet";
import useAxiosPost from "../api/useAxiosPost";
// Ensure this import is here for the matchers
import "@testing-library/jest-dom";
import * as fc from 'fast-check';

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
  setUrl: jest.fn(),
  setParams: jest.fn(),
  refetch: jest.fn(),
};

const mockAvailableWorkshopsData = {
  data: [
    {
      workshop_ID: "WS123",
      workshop_name: "Workshop A",
      workshop_type: "Type 1"
    },
    {
      workshop_ID: "WS456",
      workshop_name: "Workshop B",
      workshop_type: "Type 2"
    }
  ],
  loading: false,
  error: null,
  setUrl: jest.fn(),
  setParams: jest.fn(),
  refetch: jest.fn(),
};

const mockPendingWorkshopsData = {
  data: {
    workshop_requests: [
      {
        request_id: "REQ001",
        status: "submitted"
      },
      {
        request_id: "REQ002",
        status: "approved"
      }
    ]
  },
  loading: false,
  error: null,
  setUrl: jest.fn(),
  setParams: jest.fn(),
  refetch: jest.fn(),
};

const mockSetBody = jest.fn();
const mockRefetch = jest.fn();

// Start of ClientHomePage test suite
// beforeEach: Runs before each test to set up the mock implementations for useAxiosGet and useAxiosPost.
// useAxiosGet: Returns mockVerifyData if the URL contains "verify", otherwise returns an empty data array.
// useAxiosPost: Returns mocked setBody and refetch functions.

describe("ClientHomePage Fuzzing Tests", () => {
  let renderResult;
  beforeEach(() => {
    useAxiosGet.mockImplementation((url) => {
      if (url && url.includes("verify")) {
        return mockVerifyData;
      } else if (url && url.includes("getAvailableWorkshopData")) {
        return mockAvailableWorkshopsData;
      } else if (url && url.includes("getPendingWorkshopRequests")) {
        return mockPendingWorkshopsData;
      }
      return { data: [], loading: false, error: null, setUrl: jest.fn(), setParams: jest.fn(), refetch: jest.fn() };
    });
  
    useAxiosPost.mockImplementation(() => ({
      setBody: mockSetBody,
      refetch: mockRefetch,
    }));

    renderResult = render(
      <Router>
        <ClientHomePage/>
      </Router>
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("handle various inputs correctly", () => {
    const {getByPlaceholderText, getAllByPlaceholderText, getAllByTestId, getByText } = renderResult;
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string(),
          email: fc.string(),
          message: fc.string(),
          phone: fc.string(),
          company: fc.string(),
          pax: fc.string(),
          dealPotential: fc.string(),
          country: fc.string(),
          workshopId: fc.string(),
          workshopName: fc.string(),
          companyRole: fc.string(),
          startDate: fc.date(),
          endDate: fc.date(),
          venue: fc.string(),
          workshopType: fc.string(),
        }),
        (inputs) => {
          const {
            name,
            email,
            message,
            phone,
            company,
            pax,
            dealPotential,
            country,
            workshopId,
            workshopName,
            companyRole,
            startDate,
            endDate,
            venue,
            workshopType,
          } = inputs;

          const nameInput = screen.getByPlaceholderText(/Your Name/i);
          const emailInput = screen.getByPlaceholderText(/Your Email/i);
          const phoneInput = screen.getByPlaceholderText(/Phone Number/i);
          const companyInput = screen.getByPlaceholderText(/Your Company/i);
          const dealPotentialInput = screen.getByPlaceholderText(/Deal Size Potential in USD/i);
          const countryInput = screen.getByPlaceholderText(/Country/i);
          const venueInput = screen.getByPlaceholderText(/Venue/i);
          const workshopTypeInput = screen.getByPlaceholderText(/Workshop Type/i);

          // Populate the form fields with generated inputs
          fireEvent.change(nameInput, { target: { value: name } });
          fireEvent.change(emailInput, { target: { value: email } });
          fireEvent.change(phoneInput, { target: { value: phone } });
          fireEvent.change(companyInput, { target: { value: company } });
          fireEvent.change(dealPotentialInput, { target: { value: dealPotential } });
          fireEvent.change(countryInput, { target: { value: country } });
          fireEvent.change(venueInput, { target: { value: venue } });
          fireEvent.change(workshopTypeInput, { target: { value: workshopType } });

          // Handle date picker changes
          if (startDate && endDate) {
            const startDateInput = screen.getByPlaceholderText(/Workshop Start Date/i);
            const endDateInput = screen.getByPlaceholderText(/Workshop End Date/i);
            fireEvent.change(startDateInput, { target: { value: startDate.toLocaleDateString("en-US") } });
            fireEvent.change(endDateInput, { target: { value: endDate.toLocaleDateString("en-US") } });
          }

          // Submit the form
          fireEvent.submit(screen.getByRole('button', { name: /Submit Request/i }));

          // Assert behavior
          waitFor(() => {
            // Adjust the assertions based on what should happen after form submission
            expect(screen.getByText(/Summary of Workshop Request/i)).toBeInTheDocument();
          });
        }
      )
    );
  });
});

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
    // test: Client Home Page is rendered.
    ////////////////////////////////////////////
    test("Test : Client Homme Page is Rendered", async () => {
      render(
        <Router>
          <ClientHomePage />
        </Router>
      );
    });

  //   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   ////////////////////////////////////////////
  //   // test: Workshop Availability dropdown is Rendered
  //   ////////////////////////////////////////////
  //   test("Test : Workshop Availability dropdown is rendered", async () => {
  //     render(
  //       <Router>
  //         <ClientHomePage />
  //       </Router>
  //     );

  //     const dropdown = screen.getByPlaceholderText("Click to view workshops");
  //     expect(dropdown).toBeInTheDocument();
  //   });

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   ////////////////////////////////////////
  //   // test: Client Submit Workshop form
  //   ////////////////////////////////////////
  //   test("Test : Inputs for Client Submit Workshop form", () => {
  //     render(
  //       <Router>
  //         <ClientHomePage />
  //       </Router>
  //     );

  //     const roleInput = screen.getByPlaceholderText("Role at Company");
  //     const nameInput = screen.getByPlaceholderText("Your Name");
  //     const emailInput = screen.getByPlaceholderText("Your Email");
  //     const phoneInput = screen.getByPlaceholderText("Phone Number");
  //     const companyInput = screen.getByPlaceholderText("Your Company");
  //     const paxInput = screen.getByPlaceholderText("Number of Pax");
  //     const dealInput = screen.getByPlaceholderText("Deal Size Potential in USD");
  //     const countryInput = screen.getByPlaceholderText("Country");
  //     const venueInput = screen.getByPlaceholderText("Venue");
  //     const messageInput = screen.getByPlaceholderText("Your Message");

  //     // fireevent is the cypress equivalent of cy.
  //     fireEvent.change(roleInput, { target: { value: "Manager" } });
  //     fireEvent.change(nameInput, { target: { value: "John Doe" } });
  //     fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  //     fireEvent.change(phoneInput, { target: { value: "1234567890" } });
  //     fireEvent.change(companyInput, { target: { value: "Tech Co." } });
  //     fireEvent.change(paxInput, { target: { value: "50" } });
  //     fireEvent.change(dealInput, { target: { value: "10000" } });
  //     fireEvent.change(countryInput, { target: { value: "USA" } });
  //     fireEvent.change(venueInput, { target: { value: "New York" } });
  //     fireEvent.change(messageInput, {
  //       target: { value: "Looking forward to it." },
  //     });

  //     expect(roleInput.value).toBe("Manager");
  //     expect(nameInput.value).toBe("John Doe");
  //     expect(emailInput.value).toBe("john.doe@example.com");
  //     expect(phoneInput.value).toBe("1234567890");
  //     expect(companyInput.value).toBe("Tech Co.");
  //     expect(paxInput.value).toBe("50");
  //     expect(dealInput.value).toBe("10000");
  //     expect(countryInput.value).toBe("USA");
  //     expect(venueInput.value).toBe("New York");
  //     expect(messageInput.value).toBe("Looking forward to it.");
  //   });

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   /////////////////////////////////////////////////
  //   // test: Summary popup is rendered on submit request button click
  //   /////////////////////////////////////////////////
  //   test("Test : Summary popup is rendered on submit request button click", async () => {
  //     render(
  //       <Router>
  //         <ClientHomePage />
  //       </Router>
  //     );
  //   });

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   ////////////////////////////////////////////////////////////////////////
  //   // test: Summary popup details are exactly what is inputted.
  //   ////////////////////////////////////////////////////////////////////////
  //   test("Test : Summary popup is rendered on submit request button click", async () => {
  //     render(
  //       <Router>
  //         <ClientHomePage />
  //       </Router>
  //     );
  //     const roleInput = screen.getByPlaceholderText("Role at Company");
  //     const nameInput = screen.getByPlaceholderText("Your Name");
  //     const emailInput = screen.getByPlaceholderText("Your Email");
  //     const phoneInput = screen.getByPlaceholderText("Phone Number");
  //     const companyInput = screen.getByPlaceholderText("Your Company");
  //     const paxInput = screen.getByPlaceholderText("Number of Pax");
  //     const dealInput = screen.getByPlaceholderText("Deal Size Potential in USD");
  //     const countryInput = screen.getByPlaceholderText("Country");
  //     const venueInput = screen.getByPlaceholderText("Venue");
  //     const messageInput = screen.getByPlaceholderText("Your Message");

  //     fireEvent.change(roleInput, { target: { value: "Manager" } });
  //     fireEvent.change(nameInput, { target: { value: "John Doe" } });
  //     fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  //     fireEvent.change(phoneInput, { target: { value: "1234567890" } });
  //     fireEvent.change(companyInput, { target: { value: "Tech Co." } });
  //     fireEvent.change(paxInput, { target: { value: "50" } });
  //     fireEvent.change(dealInput, { target: { value: "10000" } });
  //     fireEvent.change(countryInput, { target: { value: "USA" } });
  //     fireEvent.change(venueInput, { target: { value: "New York" } });
  //     fireEvent.change(messageInput, {
  //       target: { value: "Looking forward to it." },
  //     });

  //     fireEvent.click(screen.getByText("Submit Request"));

  //     await waitFor(() => {
  //       expect(
  //         screen.getByText("Summary of Workshop Request")
  //       ).toBeInTheDocument();
  //       expect(screen.getByText("Confirm Request")).toBeInTheDocument();
  //       expect(screen.getByText("Edit Request")).toBeInTheDocument();

  //       // making sure summary details are what is keyed in

  //       expect(roleInput.value).toBe("Manager");
  //       expect(nameInput.value).toBe("John Doe");
  //       expect(emailInput.value).toBe("john.doe@example.com");
  //       expect(phoneInput.value).toBe("1234567890");
  //       expect(companyInput.value).toBe("Tech Co.");
  //       expect(paxInput.value).toBe("50");
  //       expect(dealInput.value).toBe("10000");
  //       expect(countryInput.value).toBe("USA");
  //       expect(venueInput.value).toBe("New York");
  //       expect(messageInput.value).toBe("Looking forward to it.");
  //     });
  //   });

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   ////////////////////////////////////////////////////////////////////
  //   // test: Checks if the summary popup is closed on edit button click.
  //   ////////////////////////////////////////////////////////////////////
  //   test("Test : Edit Button works in summary popup", async () => {
  //     render(
  //       <Router>
  //         <ClientHomePage />
  //       </Router>
  //     );

  //     const roleInput = screen.getByPlaceholderText("Role at Company");
  //     fireEvent.change(roleInput, { target: { value: "Manager" } });
  //     fireEvent.click(screen.getByText("Submit Request"));

  //     await waitFor(() => {
  //       expect(
  //         screen.getByText("Summary of Workshop Request")
  //       ).toBeInTheDocument();
  //     });

  //     fireEvent.click(screen.getByText("Edit Request"));

  //     await waitFor(() => {
  //       expect(
  //         screen.queryByText("Summary of Workshop Request")
  //       ).not.toBeInTheDocument();
  //     });
  //   });

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   ////////////////////////////////////////////////////////////////////
  //   // test: Checks if Confirm submit button from summary request works
  //   ////////////////////////////////////////////////////////////////////

  //   test("Test : Confirm Button works in summary popup", async () => {
  //     render(
  //       <Router>
  //         <ClientHomePage />
  //       </Router>
  //     );

  //     const roleInput = screen.getByPlaceholderText("Role at Company");
  //     const nameInput = screen.getByPlaceholderText("Your Name");
  //     const emailInput = screen.getByPlaceholderText("Your Email");
  //     const phoneInput = screen.getByPlaceholderText("Phone Number");
  //     const companyInput = screen.getByPlaceholderText("Your Company");
  //     const paxInput = screen.getByPlaceholderText("Number of Pax");
  //     const dealInput = screen.getByPlaceholderText("Deal Size Potential in USD");
  //     const countryInput = screen.getByPlaceholderText("Country");
  //     const venueInput = screen.getByPlaceholderText("Venue");
  //     const messageInput = screen.getByPlaceholderText("Your Message");

  //     fireEvent.change(roleInput, { target: { value: "Manager" } });
  //     fireEvent.change(nameInput, { target: { value: "John Doe" } });
  //     fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  //     fireEvent.change(phoneInput, { target: { value: "1234567890" } });
  //     fireEvent.change(companyInput, { target: { value: "Tech Co." } });
  //     fireEvent.change(paxInput, { target: { value: "50" } });
  //     fireEvent.change(dealInput, { target: { value: "10000" } });
  //     fireEvent.change(countryInput, { target: { value: "USA" } });
  //     fireEvent.change(venueInput, { target: { value: "New York" } });
  //     fireEvent.change(messageInput, {
  //       target: { value: "Looking forward to it." },
  //     });
  //     fireEvent.click(screen.getByText("Submit Request"));

  //     await waitFor(() => {
  //       expect(
  //         screen.getByText("Summary of Workshop Request")
  //       ).toBeInTheDocument();
  //     });

  //     // fireEvent.click(screen.getByText("Confirm Request"));

  //     // await waitFor(() => {
  //     //   expect(
  //     //     screen.queryByText("Summary of Workshop Request")
  //     //   ).not.toBeInTheDocument();
  //     // });
  //   });

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   ////////////////////////////////////////////////////////////////////
  //   // test: Checks if clear button works
  //   ////////////////////////////////////////////////////////////////////

  //   test("Test : Clear button works and clears all inputs", async () => {
  //     render(
  //       <Router>
  //         <ClientHomePage />
  //       </Router>
  //     );

  //     const roleInput = screen.getByPlaceholderText("Role at Company");
  //     const nameInput = screen.getByPlaceholderText("Your Name");
  //     const emailInput = screen.getByPlaceholderText("Your Email");
  //     const phoneInput = screen.getByPlaceholderText("Phone Number");
  //     const companyInput = screen.getByPlaceholderText("Your Company");
  //     const paxInput = screen.getByPlaceholderText("Number of Pax");
  //     const dealInput = screen.getByPlaceholderText("Deal Size Potential in USD");
  //     const countryInput = screen.getByPlaceholderText("Country");
  //     const venueInput = screen.getByPlaceholderText("Venue");
  //     const messageInput = screen.getByPlaceholderText("Your Message");

  //     fireEvent.change(roleInput, { target: { value: "Manager" } });
  //     fireEvent.change(nameInput, { target: { value: "John Doe" } });
  //     fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  //     fireEvent.change(phoneInput, { target: { value: "1234567890" } });
  //     fireEvent.change(companyInput, { target: { value: "Tech Co." } });
  //     fireEvent.change(paxInput, { target: { value: "50" } });
  //     fireEvent.change(dealInput, { target: { value: "10000" } });
  //     fireEvent.change(countryInput, { target: { value: "USA" } });
  //     fireEvent.change(venueInput, { target: { value: "New York" } });
  //     fireEvent.change(messageInput, {
  //       target: { value: "Looking forward to it." },
  //     });

  //     fireEvent.click(screen.getByText("Clear"));

  //     // Check if the fields are cleared
  //     await waitFor(() => {
  //       expect(roleInput.value).toBe("");
  //       expect(nameInput.value).toBe("");
  //       expect(emailInput.value).toBe("");
  //       expect(phoneInput.value).toBe("");
  //       expect(companyInput.value).toBe("");
  //       expect(paxInput.value).toBe("");
  //       expect(dealInput.value).toBe("");
  //       expect(countryInput.value).toBe("");
  //       expect(venueInput.value).toBe("");
  //       expect(messageInput.value).toBe("");
  //     });
  //   });
});
