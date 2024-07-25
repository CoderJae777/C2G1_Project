import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DateAndTime from './DateAndTime';

jest.useFakeTimers();

describe('DateAndTime', () => {
    beforeEach(() => {
        jest.clearAllTimers();
    });

    test('renders the initial date and time', () => {
        render(<DateAndTime />);
        const dateTimeElement = screen.getByText((content, element) => {
            const regex = /^[A-Za-z]+, [A-Za-z]+ [0-9]{1,2}, [0-9]{4} at [0-9]{2}:[0-9]{2}:[0-9]{2} [A|P]M$/;
            return regex.test(content);
        });
        expect(dateTimeElement).toBeInTheDocument();
    });

    test('updates the date and time every second', () => {
        render(<DateAndTime />);
        const initialDateTimeElement = screen.getByText((content, element) => {
            const regex = /^[A-Za-z]+, [A-Za-z]+ [0-9]{1,2}, [0-9]{4} at [0-9]{2}:[0-9]{2}:[0-9]{2} [A|P]M$/;
            return regex.test(content);
        });

        const initialTextContent = initialDateTimeElement.textContent;

        // Fast-forward 1 sec
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const updatedDateTimeElement = screen.getByText((content, element) => {
            const regex = /^[A-Za-z]+, [A-Za-z]+ [0-9]{1,2}, [0-9]{4} at [0-9]{2}:[0-9]{2}:[0-9]{2} [A|P]M$/;
            return regex.test(content);
        });

        const updatedTextContent = updatedDateTimeElement.textContent;

        expect(updatedTextContent).not.toBe(initialTextContent);
    });
});
