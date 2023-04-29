import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Switch from '../Switch';

test('Switch toggles correctly', () => {

    // Create a mock function to pass as a prop to the Switch component
    const onToggleMock = jest.fn();

    // Render the Switch component with isToggled set to false and onToggle set to the mock function
    const { getByRole } = render(<Switch isToggled={false} onToggle={onToggleMock} />);

    // Get the switch toggle element by its role
    const switchToggle = getByRole('checkbox');

    // Simulate a click on the switch toggle
    fireEvent.click(switchToggle);

    // Check that the mock function was called once with true as its argument
    expect(onToggleMock).toHaveBeenCalledTimes(1);
    expect(onToggleMock).toHaveBeenCalledWith(true);

    // Check that the input element within the switch toggle now has the checked attribute
    expect(switchToggle.querySelector('input')).toHaveAttribute('checked', '');
});
