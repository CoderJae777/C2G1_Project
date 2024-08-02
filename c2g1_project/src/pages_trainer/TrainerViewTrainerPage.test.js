import React from "react";
import { render, screen, fireEvent, waitFor, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TrainerViewTrainerPage from "../pages_trainer/TrainerViewTrainerPage";
import useAxiosGet from "../api/useAxiosGet";
import { config } from "../config/config";
import { endpoints } from "../config/endpoints";

// Mocking the useAxiosGet hook
jest.mock("../api/useAxiosGet");

// Mocking the imported components
jest.mock("../components/TrainerTopLeftSideBar", () => () => <div>TopLeftSidebar Component</div>);
jest.mock("../components/ColourCalendarPopup", () => ({ onClose, trainerId, fullname, ondateClick, trainerdata, workshopdata }) => (
  <div>
    <div>TrainerScheduleCalendar Component</div>
    <button onClick={onClose}>Close Calendar</button>
    <button onClick={() => ondateClick({ trainers: [1] })}>Open Workshop Details</button>
  </div>
));
jest.mock("../components/WorkshopAndClientDetails", () => ({ onClose, workshop }) => (
  <div>
    <div>WorkshopAndClientDetails Component</div>
    <button onClick={onClose}>Close Details</button>
  </div>
));

describe("TrainerViewTrainerPage", () => {
  beforeEach(() => {
    // Mock the API calls
    useAxiosGet.mockImplementation((url) => {
        if (url === config.base_url + endpoints.trainer.getApprovedWorkshops) {
          return {
            data: [{ trainers: [1, 2, 3] }],
            loading: false,
            error: null,
          };
        }
        if (url === config.base_url + endpoints.verify) {
          return {
            data: { role: "trainer", id: 1 },
            loading: false,
            error: null,
          };
        }
        if (url === config.base_url + endpoints.trainer.getOthers) {
          return {
            data: [
              {
                fullname: "John Doe",
                trainer_role: "Lead Trainer",
                username: "jdoe",
                _id: 1,
              },
            ],
            loading: false,
            error: null,
          };
        }
        return { data: null, loading: true, error: null };
      });
  });
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<TrainerViewTrainerPage />);
    expect(screen.getByText("TopLeftSidebar Component")).toBeInTheDocument();
    expect(screen.getByText("Trainers")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("opens and closes the TrainerScheduleCalendar", async () => {
    render(<TrainerViewTrainerPage />);

    const viewScheduleButton = screen.getByText("View Schedule");
    fireEvent.click(viewScheduleButton);

    await waitFor(() => screen.getByText("TrainerScheduleCalendar Component"));
    expect(screen.getByText("TrainerScheduleCalendar Component")).toBeInTheDocument();

    const closeButton = screen.getByText("Close Calendar");
    fireEvent.click(closeButton);

    await waitFor(() => expect(screen.queryByText("TrainerScheduleCalendar Component")).not.toBeInTheDocument());
  });

  test("opens and closes the WorkshopAndClientDetails", async () => {
    render(<TrainerViewTrainerPage />);

    const viewScheduleButton = screen.getByText("View Schedule");
    fireEvent.click(viewScheduleButton);

    await waitFor(() => screen.getByText("TrainerScheduleCalendar Component"));

    const openDetailsButton = screen.getByText("Open Workshop Details");
    fireEvent.click(openDetailsButton);

    await waitFor(() => screen.getByText("WorkshopAndClientDetails Component"));
    expect(screen.getByText("WorkshopAndClientDetails Component")).toBeInTheDocument();

    const closeDetailsButton = screen.getByText("Close Details");
    fireEvent.click(closeDetailsButton);

    await waitFor(() => expect(screen.queryByText("WorkshopAndClientDetails Component")).not.toBeInTheDocument());
  });

  test("shows 'Not logged in' if user is not a trainer", () => {
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

    render(<TrainerViewTrainerPage />);
    expect(screen.getByText("Not logged in")).toBeInTheDocument();
  });
});