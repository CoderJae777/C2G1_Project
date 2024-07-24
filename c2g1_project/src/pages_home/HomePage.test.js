import { render, screen, cleanup } from '@testing-library/react';
import HomePage from './HomePage';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import emailjs from '@emailjs/browser';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(() => Promise.resolve({ status: 200 })),
}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('Test : Home Page renders correctly', async () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  // Check if the heading is present
  const heading = screen.getByText(/Grow your skills with Dell Academy!/i);
  expect(heading).toBeInTheDocument();

  // Check if the 'Book a workshop!' button is present and clickable
  const bookWorkshopButton = screen.getByRole('button', { name: /book a workshop!/i });
  expect(bookWorkshopButton).toBeInTheDocument();
  userEvent.click(bookWorkshopButton);
  expect(mockNavigate).toHaveBeenCalledWith('/LoginPage');

  // Check if the 'See Workshops' button is present and clickable
  const seeWorkshopsButton = screen.getByRole('button', { name: /see workshops/i });
  expect(seeWorkshopsButton).toBeInTheDocument();
  userEvent.click(seeWorkshopsButton);
  expect(mockNavigate).toHaveBeenCalledWith('/OurWorkshopPage');

  // Check if the 'Contact Us' section is present
  const contactUsSection = screen.getByText(/Contact Us/i, { selector: 'h3' });
  expect(contactUsSection).toBeInTheDocument();

  // Check if the 'Why Dell Academy?' section is present
  const whyDellAcademyHeading = screen.getByText(/Why Dell Academy?/i);
  expect(whyDellAcademyHeading).toBeInTheDocument();

  // Test inputs in the Contact Form
  const nameInput = screen.getByPlaceholderText(/Your Name/i);
  const emailInput = screen.getByPlaceholderText(/Your Email/i);
  const phoneInput = screen.getByPlaceholderText(/Phone Number/i);
  const companyInput = screen.getByPlaceholderText(/Your Company/i);
  const messageInput = screen.getByPlaceholderText(/Your Message/i);
  const submitButton = screen.getByRole('button', { name: /send!/i });

  // Simulate user typing into the inputs
  userEvent.type(nameInput, 'John Doe');
  userEvent.type(emailInput, 'johndoe@example.com');
  userEvent.type(phoneInput, '1234567890');
  userEvent.type(companyInput, 'Example Company');
  userEvent.type(messageInput, 'Hello, I am interested in your workshops.');

  // Check if the inputs have the correct values
  expect(nameInput).toHaveValue('John Doe');
  expect(emailInput).toHaveValue('johndoe@example.com');
  expect(phoneInput).toHaveValue('1234567890');
  expect(companyInput).toHaveValue('Example Company');
  expect(messageInput).toHaveValue('Hello, I am interested in your workshops.');

// Simulate form submission
//   userEvent.click(submitButton);

//   // Ensure EmailJS send function was called with correct parameters
//   expect(emailjs.send).toHaveBeenCalledWith(
//     'service_ks4czg2',
//     'template_oypb9n6',
//     {
//       from_name: 'John Doe',
//       from_email: 'johndoe@example.com',
//       to_name: 'DellAcademy',
//       message: 'Hello, I am interested in your workshops.',
//       phone: '1234567890',
//       company_name: 'Example Company',
//     },
//     '1T7xmpr5tqQhyh-GS'
//   );
});
