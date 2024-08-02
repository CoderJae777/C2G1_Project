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

//   it('displays workshop details on hover', () => {
//     render(
//       <ColourCalendarPopup
//         onClose={jest.fn()}
//         fullname="Trainer One"
//         trainerId="t1"
//         trainerdata={mockTrainerData}
//         ondateClick={jest.fn()}
//         workshopdata={mockWorkshopData}
//       />
//     );

//     // Find the day number element and its closest list item
//     const dayNumberButton = screen.getByText('1');
//     const dayListItem = dayNumberButton.closest('li');
    
//     if (!dayListItem) {
//       throw new Error('Day list item not found');
//     }

//     const calendarDetails = dayListItem.querySelector('.calendar-details');

//     if (!calendarDetails) {
//       throw new Error('Calendar details not found');
//     }

//     // Function to check if the element is hidden
//     const isElementHidden = (el) => {
//       const style = window.getComputedStyle(el);
//       return style.display === 'none';
//     };

//     // Initial state: details should be hidden
//     expect(isElementHidden(calendarDetails)).toBe(true);

//     // Simulate mouse over
//     fireEvent.mouseOver(dayListItem);
    
//     // Delay to account for any CSS transition
//     setTimeout(() => {
//       // Check that the element becomes visible
//       expect(isElementHidden(calendarDetails)).toBe(false);

//       // Check for specific content
//       expect(calendarDetails).toHaveTextContent('Request ID: req1');
//       expect(calendarDetails).toHaveTextContent('Client: Company A');
//       expect(calendarDetails).toHaveTextContent('Assigned Trainers: Trainer One');
      
//       // Simulate mouse out
//       fireEvent.mouseOut(dayListItem);

//       // Delay to account for any CSS transition
//       setTimeout(() => {
//         // Check that the element is hidden again
//         expect(isElementHidden(calendarDetails)).toBe(true);
//       }, 500); // Adjust delay as necessary
//     }, 500); // Adjust delay as necessary
//   });

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
