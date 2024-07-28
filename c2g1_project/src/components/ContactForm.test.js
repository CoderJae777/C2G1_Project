import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactForm from "./ContactForm";
import emailjs from "@emailjs/browser";

// Mock the emailjs module
jest.mock("@emailjs/browser", () => ({
  send: jest.fn(),
}));

// Mock window.alert
const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
const mockConsoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

// Clean up after each test
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test("Test: ContactForm rendered correctly, mocked an email sent on submit", async () => {
  render(<ContactForm />);
});

test("Test: ContactForm inputs are reflected correctly", async () => {
  render(<ContactForm />);

  fireEvent.change(screen.getByPlaceholderText("Your Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Email"), {
    target: { value: "johndoe@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
    target: { value: "1234567890" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Company"), {
    target: { value: "Example Corp" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Message"), {
    target: { value: "Hello, this is a test message." },
  });

  expect(screen.getByPlaceholderText("Your Name").value).toBe("John Doe");
  expect(screen.getByPlaceholderText("Your Email").value).toBe(
    "johndoe@example.com"
  );
  expect(screen.getByPlaceholderText("Phone Number").value).toBe("1234567890");
  expect(screen.getByPlaceholderText("Your Company").value).toBe(
    "Example Corp"
  );
  expect(screen.getByPlaceholderText("Your Message").value).toBe(
    "Hello, this is a test message."
  );
});

test("Test: Mocked successful email sent", async () => {
  // Force a successful email sent
  emailjs.send.mockResolvedValueOnce({ status: 200, text: "OK" });
  render(<ContactForm />);

  fireEvent.change(screen.getByPlaceholderText("Your Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Email"), {
    target: { value: "johndoe@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
    target: { value: "1234567890" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Company"), {
    target: { value: "Example Corp" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Message"), {
    target: { value: "Hello, this is a test message." },
  });

  // Submit the form
  fireEvent.click(screen.getByText("Send!"));

  // Check if emailjs.send was called with the correct parameters
  expect(emailjs.send).toHaveBeenCalledWith(
    "service_ks4czg2",
    "template_oypb9n6",
    {
      from_name: "John Doe",
      from_email: "johndoe@example.com",
      to_name: "DellAcademy",
      message: "Hello, this is a test message.",
      phone: "1234567890",
      company_name: "Example Corp",
    },
    "1T7xmpr5tqQhyh-GS"
  );

  // Wait for alert message
  await waitFor(() => {
    expect(mockAlert).toHaveBeenCalledWith(
      "Your Message Has Been Sent! An Admin will contact you within 3 working days"
    );
  });

  // Check if form fields are cleared
  expect(screen.getByPlaceholderText("Your Name").value).toBe("");
  expect(screen.getByPlaceholderText("Your Email").value).toBe("");
  expect(screen.getByPlaceholderText("Phone Number").value).toBe("");
  expect(screen.getByPlaceholderText("Your Company").value).toBe("");
  expect(screen.getByPlaceholderText("Your Message").value).toBe("");
});

test("Test: Mocked failed email sent", async () => {
  // Force a failed email sent
  emailjs.send.mockRejectedValueOnce(new Error("Failed to send email"));

  render(<ContactForm />);

  // Fill the form
  fireEvent.change(screen.getByPlaceholderText("Your Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Email"), {
    target: { value: "johndoe@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
    target: { value: "1234567890" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Company"), {
    target: { value: "Example Corp" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Message"), {
    target: { value: "Hello, this is a test message." },
  });

  // Submit the form
  fireEvent.click(screen.getByText("Send!"));

  // Wait for console error to be called
  await waitFor(() => {
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error sending email:",
      new Error("Failed to send email")
    );
  });
});
