import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ColourCalendar from './ColourCalendar';

const mockWorkshopData = [
  {
    id: '1',
    request_id: 'req1',
    company: 'Company A',
    start_date: '2024-08-01',
    end_date: '2024-08-02',
    trainers: [{ _id: 't1', fullname: 'Trainer One' }]
  },
  {
    id: '2',
    request_id: 'req2',
    company: 'Company B',
    start_date: '2024-08-05',
    end_date: '2024-08-06',
    trainers: [{ _id: 't2', fullname: 'Trainer Two' }]
  }
];

const mockTrainerData = [
  { _id: 't1', fullname: 'Trainer One' },
  { _id: 't2', fullname: 'Trainer Two' }
];

describe('ColourCalendar', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
      });
  it('renders the calendar with the correct initial state', () => {
    render(<ColourCalendar workshopdata={mockWorkshopData} ondateClick={jest.fn()} trainerdata={mockTrainerData} />);
    
    expect(screen.getByText(/August 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Sun/i)).toBeInTheDocument();
    expect(screen.getByText(/Mon/i)).toBeInTheDocument();
    expect(screen.getByText(/Tue/i)).toBeInTheDocument();
    expect(screen.getByText(/Wed/i)).toBeInTheDocument();
    expect(screen.getByText(/Thu/i)).toBeInTheDocument();
    expect(screen.getByText(/Fri/i)).toBeInTheDocument();
    expect(screen.getByText(/Sat/i)).toBeInTheDocument();
  });

  it('navigates to the previous month when the left arrow is clicked', () => {
    render(<ColourCalendar workshopdata={mockWorkshopData} ondateClick={jest.fn()} trainerdata={mockTrainerData} />);

    fireEvent.click(screen.getByRole('button1'));
    expect(screen.getByText(/July 2024/i)).toBeInTheDocument();
  });

  it('navigates to the next month when the right arrow is clicked', () => {
    render(<ColourCalendar workshopdata={mockWorkshopData} ondateClick={jest.fn()} trainerdata={mockTrainerData} />);

    fireEvent.click(screen.getByRole('button2'));
    expect(screen.getByText(/September 2024/i)).toBeInTheDocument();
  });

  it('calls ondateClick with the correct date when a date is clicked', () => {
    const ondateClick = jest.fn();
    render(<ColourCalendar workshopdata={mockWorkshopData} ondateClick={ondateClick} trainerdata={mockTrainerData} />);

    const dateButton = screen.getByText('1');
    fireEvent.click(dateButton);

    expect(ondateClick).toHaveBeenCalledWith('2024-08-01');
  });

  it('displays workshop details correctly', () => {
    render(<ColourCalendar workshopdata={mockWorkshopData} ondateClick={jest.fn()} trainerdata={mockTrainerData} />);
    
    fireEvent.mouseOver(screen.getByText('1'));

    expect(screen.getAllByText(/Request ID: req1/i).length == 2)
    expect(screen.getAllByText(/Client: Company A/i).length == 2)
    expect(screen.getAllByText(/Assigned Trainers: Trainer One/i).length == 2)
  });
});
