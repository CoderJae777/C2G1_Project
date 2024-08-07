import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import TrainerHomePage from '../pages_trainer/TrainerHomePage'; // Adjust the import path as needed
import { BrowserRouter as Router } from "react-router-dom"; // Router component from react-router-dom for handling routes in tests.
import useFetch from '../components/useFetch';
import useAxiosGet from '../api/useAxiosGet';
import useAxiosPatch from '../api/useAxiosPatch';
import '@testing-library/jest-dom/extend-expect';
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";
import * as fc from 'fast-check';

// Mock the custom hooks
jest.mock('../components/useFetch');
jest.mock('../api/useAxiosGet');
jest.mock('../api/useAxiosPatch');

const mockUseFetch = useFetch;
const mockUseAxiosGet = useAxiosGet;
const mockUseAxiosPatch = useAxiosPatch;

const mockVerifyData = {
    data: { id: 1, role: "trainer" },
    loading: false,
    error: null,
    setBody: jest.fn(),
      setUrl: jest.fn(),
      refetch: jest.fn(),
  };

const mockGetAllocatedWorkshopRequests = {
    data: {
        trainer_workshops: [
          { _id: '1', request_id: 'REQ1', workshop_data: { workshop_name: 'Workshop 1' }, company: "Company A", utilisation:[{hours: 0, utilisation_details:"Detail 1"},{hours: 0, utilisation_details:"Detail 2"},{hours: 0, utilisation_details:"Detail 3"},{hours: 0, utilisation_details:"Detail 4"}] },
          { _id: '2', request_id: 'REQ2', workshop_data: { workshop_name: 'Workshop 2' }, company: "Company B", utilisation:[{hours: 0, utilisation_details:"Detail 1"},{hours: 0, utilisation_details:"Detail 2"},{hours: 0, utilisation_details:"Detail 3"},{hours: 0, utilisation_details:"Detail 4"}] },
        ],
      },
    loading: false,
    error: null,
    setBody: jest.fn(),
    setUrl: jest.fn(),
    refetch: jest.fn(),
}

const mockgetSingleWorkshopRequest = {
  data: {
    _id: "1",
    client: "66ab9849e5a66f6b55149f49",
    company_role: "General Manager",
    company: "Company I",
    name: "I",
    country: "Singapore",
    deal_potential: 10000,
    email: "I@gmail.com",
    end_date: "2024-09-10T00:00:00.000Z",
    start_date: "2024-09-03T00:00:00.000Z",
    status: "approved",
    trainers: ["66ab9849e5a66f6b55149f4a"],
    utilisation: [
      { hours: 2, utilisation_details: "Detail 1" },
      { hours: 3, utilisation_details: "Detail 2" },
      { hours: 7, utilisation_details: "Detail 3" },
      { hours: 1, utilisation_details: "Detail 4" }
    ],
    venue: "Venue I",
    workshop_data: "66ab9849e5a66f6b55149f4d",
    phone_number: 1234567890,
    reject_reason: "",
    request_message: "This workshop is much awaited",
    pax: ">50",
  },
  loading: false,
  error: null,
  setBody: jest.fn(),
  setUrl: jest.fn(),
  refetch: jest.fn(),
}


describe('TrainerHomePage', () => {
  beforeEach(() => {
    // Set up the default mock implementations
    mockUseFetch.mockReturnValue({
      trainer_data: null,
      workshop_data: null,
      today_data: null,
    });

    useAxiosGet.mockImplementation((url) => {
        if (url && url.includes("verify")) {
          return mockVerifyData;
        }
        else if (url && url.includes("allocatedworkshops")){
            return mockGetAllocatedWorkshopRequests;
        }
        else if (url && url.includes("workshoprequest")){
          return mockgetSingleWorkshopRequest;
        }
        return {data: null,
            loading: false,
            error: null,
            setBody: jest.fn(),
            setUrl: jest.fn(),
            refetch: jest.fn(),};
      });

    mockUseAxiosPatch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      setBody: jest.fn(),
      setUrl: jest.fn(),
      refetch: jest.fn(),
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  //

  test('renders the component', () => {
    render(
      <Router>
        <TrainerHomePage />
      </Router>
    );
    expect(screen.getByText('Update Work Hours')).toBeInTheDocument();
  });

  test('renders all expected main components', () => {
    render(
      <Router>
        <TrainerHomePage />
      </Router>
    );
    const workhours = screen.getAllByPlaceholderText('0');
    const ud = screen.getAllByText('Utilisation Details')
    // Check for presence of main elements
    expect(screen.getByText('Update Work Hours')).toBeInTheDocument();
    expect(screen.getByText('Workshop Utilisation Hours')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    for (let i=0;i<=3;i++){
        expect(workhours[i]).toBeInTheDocument();
        expect(ud[i]).toBeInTheDocument();
    }
    expect(screen.getByText('Submit Utilisation')).toBeInTheDocument();
    expect(screen.getByText('-- Workshop --')).toBeInTheDocument();
    expect(screen.getByTestId('workshop-select')).toBeInTheDocument();
  });

  test('renders the select dropdown with workshop options', async () => {
    render(
      <Router>
        <TrainerHomePage />
      </Router>
    );

    fireEvent.focus(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(screen.getByText('REQ1 Workshop 1')).toBeInTheDocument();
      expect(screen.getByText('REQ2 Workshop 2')).toBeInTheDocument();
    });
  });

  test('handles workshop selection', async () => {

    render(
      <Router>
        <TrainerHomePage />
      </Router>
    );
    const select = screen.getByRole('combobox');
    expect(select.value).toBe("Workshop");
    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe("1");
    fireEvent.change(select, { target: { value: 'e' } });
    expect(select.value).toBe("Workshop");
  });

  test('renders utilisation panel', () => {

    render(
      <Router>
        <TrainerHomePage />
      </Router>
    );
    expect(screen.getByText('Company A')).toBeInTheDocument();
  });

  test('renders utilisation popup', () => {

    render(
      <Router>
        <TrainerHomePage />
      </Router>
    );
    fireEvent.click(screen.getByText('Company A'));
    expect(screen.getByText('Utilisation Hours 1:')).toBeInTheDocument();
  });

  test("shows 'Not logged in' if user is not a trainer", () => {
    useAxiosGet.mockImplementation((url) => {
      if (url && url.includes("verify")) {
        return {
          data: { id: 1, role: "admin" },
          loading: false,
          error: null,
          setBody: jest.fn(),
          setUrl: jest.fn(),
          refetch: jest.fn(),
      };
      }
      else if (url && url.includes("allocatedworkshops")){
          return mockGetAllocatedWorkshopRequests;
      }
      else if (url && url.includes("workshoprequest")){
        return mockgetSingleWorkshopRequest;
      }
      return {data: null,
          loading: false,
          error: null,
          setBody: jest.fn(),
          setUrl: jest.fn(),
          refetch: jest.fn(),};
    });

    render(
      <Router>
        <TrainerHomePage />
      </Router>
    );
    expect(screen.getByText("Not logged in")).toBeInTheDocument();
  });
  
});


describe('TrainerHomePage Fuzzing', () => {
  let renderResult;

  beforeEach(() => {
    // Set up the default mock implementations
    mockUseFetch.mockReturnValue({
      trainer_data: null,
      workshop_data: null,
      today_data: null,
    });

    useAxiosGet.mockImplementation((url) => {
        if (url && url.includes("verify")) {
          return mockVerifyData;
        }
        else if (url && url.includes("allocatedworkshops")){
            return mockGetAllocatedWorkshopRequests;
        }
        else if (url && url.includes("workshoprequest")){
          return mockgetSingleWorkshopRequest;
        }
        return {data: null,
            loading: false,
            error: null,
            setBody: jest.fn(),
            setUrl: jest.fn(),
            refetch: jest.fn(),};
      });

    mockUseAxiosPatch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      setBody: jest.fn(),
      setUrl: jest.fn(),
      refetch: jest.fn(),
    });
    
    renderResult = render(
      <Router>
        <TrainerHomePage />
      </Router>
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders the component', () => {
    const { getByText } = renderResult;
    expect(getByText('Update Work Hours')).toBeInTheDocument();
  });

  // Other tests...

  test("fuzzing input", async () => {
    const { getByRole, getAllByPlaceholderText, getAllByTestId, getByText, queryByText } = renderResult;
    await waitFor(() => {
      expect(getByRole('combobox')).toBeInTheDocument();
    });

    fc.assert(
      fc.property(
        fc.record({
          hours1: fc.integer(),
          hours2: fc.integer(),
          hours3: fc.integer(),
          hours4: fc.integer(),
          utilisation1: fc.string(),
          utilisation2: fc.string(),
          utilisation3: fc.string(),
          utilisation4: fc.string(),
        }),
        ({ hours1, hours2, hours3, hours4, utilisation1, utilisation2, utilisation3, utilisation4 }) => {

          fireEvent.change(getByRole('combobox'), { target: { value: 1 } });
          fireEvent.change(getAllByPlaceholderText('0')[0], { target: { value: hours1 } });
          fireEvent.change(getAllByPlaceholderText('0')[1], { target: { value: hours2 } });
          fireEvent.change(getAllByPlaceholderText('0')[2], { target: { value: hours3 } });
          fireEvent.change(getAllByPlaceholderText('0')[3], { target: { value: hours4 } });

          fireEvent.change(getAllByTestId('detail-input')[0], { target: { value: utilisation1 } });
          fireEvent.change(getAllByTestId('detail-input')[1], { target: { value: utilisation2 } });
          fireEvent.change(getAllByTestId('detail-input')[2], { target: { value: utilisation3 } });
          fireEvent.change(getAllByTestId('detail-input')[3], { target: { value: utilisation4 } });
          

          console.log( hours1, hours2, hours3, hours4, utilisation1, utilisation2, utilisation3, utilisation4 )
          fireEvent.click(getByText('Submit Utilisation'));
          fireEvent.click(screen.getByText('Company A'));
          expect(screen.getByText('Utilisation Hours 1:')).toBeInTheDocument();
          expect(screen.queryAllByText(hours1)[0]).toBeInTheDocument;
          expect(screen.queryAllByText(hours2)[0]).toBeInTheDocument;
          expect(screen.queryAllByText(hours3)[0]).toBeInTheDocument;
          expect(screen.queryAllByText(hours4)[0]).toBeInTheDocument;
          expect(screen.queryAllByText(utilisation1)[0]).toBeInTheDocument;
          expect(screen.queryAllByText(utilisation2)[0]).toBeInTheDocument;
          expect(screen.queryAllByText(utilisation3)[0]).toBeInTheDocument;
          expect(screen.queryAllByText(utilisation4)[0]).toBeInTheDocument;
        }
      )
    );
  });
});