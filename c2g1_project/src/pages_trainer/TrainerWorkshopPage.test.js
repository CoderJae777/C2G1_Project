import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TrainerWorkshopPage from "../pages_trainer/TrainerWorkshopPage";
import useFetch from "../components/useFetch";
import useAxiosGet from "../api/useAxiosGet";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";


// Mocking the useAxiosGet hook
jest.mock("../api/useAxiosGet");
jest.mock("../components/useFetch");

// Mocking the imported components
jest.mock("../components/TrainerTopLeftSideBar", () => () => <div>TopLeftSideBar Component</div>);
jest.mock("../components/WorkshopAndClientDetails", () => ({ onClose, workshop }) => (
  <div>
    <div>WorkshopAndClientDetails Component</div>
    <button onClick={onClose}>Close Details</button>
  </div>
));
jest.mock("../components/ColourCalendar", () => ({ workshopdata, ondateClick, trainerdata }) => (
  <div>ColourCalendar Component</div>
));

describe("TrainerWorkshopPage", () => {
  beforeEach(() => {
    useAxiosGet.mockImplementation((url) => {
      if (url === config.base_url + endpoints.trainer.getAllocatedWorkshopRequests) { 
        return {
          data: { trainer_workshops: [{ _id: 1, start_date: "2023-08-01", end_date: "2023-08-02", company: "Company A", workshop_data: { workshop_name: "Workshop 1" }, trainers: [1] }] },
          loading: false,
          error: null,
          setBody: jest.fn(),
          setUrl: jest.fn(),
          refetch: jest.fn(),
        };
      }
      if (url === config.base_url + endpoints.trainer.getOthers) {
        return {
          data: [{ _id: 1, fullname: "John Doe" }],
          loading: false,
          error: null,
          setBody: jest.fn(),
          setUrl: jest.fn(),
          refetch: jest.fn(),
        };
      }
      if (url === config.base_url + endpoints.trainer.getApprovedWorkshops) {
        return {
          data: [[{ _id: 2, start_date: "2023-08-03", end_date: "2023-08-04", company: "Company B", workshop_data: "1" , trainers: [2] }]],
          loading: false,
          error: null,
          setBody: jest.fn(),
          setUrl: jest.fn(),
          refetch: jest.fn(),
        };
      }
      if (url === config.base_url + endpoints.verify) {
        return {
            data: { role: "trainer", id: 1 },
            loading: false,
            error: null,
            setBody: jest.fn(),
            setUrl: jest.fn(),
            refetch: jest.fn(),
          };
      }
      return { data: null, loading: true, error: null };
    });

    useFetch.mockImplementation(() => ({
      trainer_data: [],
      workshop_data: [],
      today_data: [],
    }));
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<TrainerWorkshopPage />);
    expect(screen.getByText("TopLeftSideBar Component")).toBeInTheDocument();
    expect(screen.getByText("Workshop Dates")).toBeInTheDocument();
    expect(screen.getByText("Workshops")).toBeInTheDocument();
    expect(screen.getByText(/Assigned Trainers: John Doe/i)).toBeInTheDocument();
  });

  it("opens and closes the WorkshopAndClientDetails", async () => {
    render(<TrainerWorkshopPage />);

    const workshopButton = screen.getByText(/Assigned Trainers: John Doe/i);
    fireEvent.click(workshopButton);

    await waitFor(() => screen.getByText("WorkshopAndClientDetails Component"));
    expect(screen.getByText("WorkshopAndClientDetails Component")).toBeInTheDocument();

    const closeDetailsButton = screen.getByText("Close Details");
    fireEvent.click(closeDetailsButton);

    await waitFor(() => expect(screen.queryByText("WorkshopAndClientDetails Component")).not.toBeInTheDocument());
  });

  it('filters workshops correctly', async () => {
    render(<TrainerWorkshopPage />);

    await waitFor(() => {
      expect(screen.getByText(/2023-08-01/i)).toBeInTheDocument();
      expect(screen.getByText(/2023-08-03/i)).toBeInTheDocument();
    });

    const filterInput = screen.getByPlaceholderText('Type to filter');
    fireEvent.change(filterInput, { target: { value: 'Company A' } });

    expect(screen.getByText(/Company A/i)).toBeInTheDocument();
    expect(screen.queryByText(/Company B/i)).not.toBeInTheDocument();
    expect(screen.getByText(/2023-08-01/i)).toBeInTheDocument();
    expect(screen.queryByText(/2023-08-03/i)).not.toBeInTheDocument();
  });

  it('sorts workshops correctly', async () => {
    render(<TrainerWorkshopPage />);

    // Ensure workshops are loaded and displayed
    await waitFor(() => {
      expect(screen.getByText(/Company A/i)).toBeInTheDocument();
      expect(screen.getByText(/Company B/i)).toBeInTheDocument();
    });

    // Ensure sort select and options are present
    const sortSelect = screen.getByDisplayValue("Request ID");
    fireEvent.change(sortSelect, { target: { value: "earliest_start" } });

    // Verify the workshops are sorted by start date
    await waitFor(() => {
      const workshopPanels = screen.getAllByRole("button", { name: /Assigned Trainers:/i });
      expect(workshopPanels[0]).toHaveTextContent("Company A");
      expect(workshopPanels[1]).toHaveTextContent("Company B");
    });
  });

  it("shows 'Not logged in' if user is not a trainer", () => {
    useAxiosGet.mockImplementation((url) => {
      if (url === config.base_url + endpoints.verify) {
        return {
            data: { id: 1, role: "admin" },
            loading: false,
            error: null,
            setBody: jest.fn(),
            setUrl: jest.fn(),
            refetch: jest.fn(),
        };
      }
      return { data: null, loading: true, error: null };
    });

    render(<TrainerWorkshopPage />);
    expect(screen.getByText("Not logged in")).toBeInTheDocument();
  });
});
