import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ColourCalendarPopup from './ColourCalendarPopup';

const mockWorkshopData = [
  {
    id: '1',
    request_id: 'req1',
    company: 'Company A',
    start_date: '2024-08-01',
    end_date: '2024-08-02',
    trainers: ['t1']
  },
  {
    id: '2',
    request_id: 'req2',
    company: 'Company B',
    start_date: '2024-08-05',
    end_date: '2024-08-06',
    trainers: ['t2']
  }
];

const mockTrainerData = [
  { _id: 't1', fullname: 'Trainer One' },
  { _id: 't2', fullname: 'Trainer Two' }
];

describe('ColourCalendarPopup', () => {
  it('renders and displays trainer information correctly', () => {
    const onClose = jest.fn();
    render(
      <ColourCalendarPopup
        onClose={onClose}
        fullname="Trainer One"
        trainerId="t1"
        trainerdata={mockTrainerData}
        ondateClick={jest.fn()}
        workshopdata={mockWorkshopData}
      />
    );

    expect(screen.getByText('Trainer: Trainer One')).toBeInTheDocument();
    expect(screen.getByText('August 2024')).toBeInTheDocument();
  });

  it('closes the popup when clicking outside of it', () => {
    const onClose = jest.fn();
    render(
      <ColourCalendarPopup
        onClose={onClose}
        fullname="Trainer One"
        trainerId="t1"
        trainerdata={mockTrainerData}
        ondateClick={jest.fn()}
        workshopdata={mockWorkshopData}
      />
    );

    fireEvent.mouseDown(document);
    expect(onClose).toHaveBeenCalled();
  });

  it('navigates to the previous month correctly', () => {
    render(
      <ColourCalendarPopup
        onClose={jest.fn()}
        fullname="Trainer One"
        trainerId="t1"
        trainerdata={mockTrainerData}
        ondateClick={jest.fn()}
        workshopdata={mockWorkshopData}
      />
    );

    fireEvent.click(screen.getByRole('button1'));
    expect(screen.getByText('July 2024')).toBeInTheDocument();
  });

  it('navigates to the next month correctly', () => {
    render(
      <ColourCalendarPopup
        onClose={jest.fn()}
        fullname="Trainer One"
        trainerId="t1"
        trainerdata={mockTrainerData}
        ondateClick={jest.fn()}
        workshopdata={mockWorkshopData}
      />
    );

    fireEvent.click(screen.getByRole('button2'));
    expect(screen.getByText('September 2024')).toBeInTheDocument();
  });
});
