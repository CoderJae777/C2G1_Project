import { render, screen, cleanup, getByTestId } from '@testing-library/react';
import TrainerHomePage from "../pages_trainer/TrainerHomePage";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import emailjs from '@emailjs/browser';
// Custom hooks for making GET and POST requests.
import useAxiosGet from "../api/useAxiosGet";
import useAxiosPost from "../api/useAxiosPost";

// hooks to prevent actual network requests.
jest.mock("../api/useAxiosGet");
jest.mock("../api/useAxiosPost");

const mockVerifyData = {
    data: { id: 1, role: "trainer" },
    loading: false,
    error: null,
  };

describe("trainerhomepage test-suite", () => {
    test("Submit Request button is rendered", () => {
        render(<admin-graphs/>);
    });

})