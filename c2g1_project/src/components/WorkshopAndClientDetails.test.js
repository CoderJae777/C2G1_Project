import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WorkshopAndClientDetails from './WorkshopAndClientDetails';

const mockWorkshop = {
  request_id: 'req1',
  company: 'Company A',
  name: 'John Doe',
  company_role: 'Client Role',
  email: 'johndoe@example.com',
  phone_number: '123-456-7890',
  start_date: '2023-08-01',
  end_date: '2023-08-02',
  deal_potential: 'High',
  country: 'USA',
  venue: 'Conference Room A',
  pax: 50,
  request_message: 'Looking forward to the workshop',
  workshop_data: {
    workshop_name: 'Workshop 1',
  },
};

describe('WorkshopAndClientDetails', () => {
  it('renders workshop details correctly', () => {
    render(<WorkshopAndClientDetails workshop={mockWorkshop} onClose={jest.fn()} />);

    expect(screen.getByText(/Workshop Details/i)).toBeInTheDocument();
    expect(screen.getByText(/req1/i)).toBeInTheDocument();
    expect(screen.getByText(/Workshop 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Company A/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Client Role/i)).toBeInTheDocument();
    expect(screen.getByText(/johndoe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-08-01/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-08-02/i)).toBeInTheDocument();
    expect(screen.getByText(/High/i)).toBeInTheDocument();
    expect(screen.getByText(/USA/i)).toBeInTheDocument();
    expect(screen.getByText(/Conference Room A/i)).toBeInTheDocument();
    expect(screen.getByText(/50/i)).toBeInTheDocument();
    expect(screen.getByText(/Looking forward to the workshop/i)).toBeInTheDocument();
  });

  it('calls onClose when clicking outside the popup', () => {
    const onClose = jest.fn();
    render(<WorkshopAndClientDetails workshop={mockWorkshop} onClose={onClose} />);

    // Simulate a click outside the popup
    fireEvent.mouseDown(document);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the close button', () => {
    const onClose = jest.fn();
    render(<WorkshopAndClientDetails workshop={mockWorkshop} onClose={onClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
