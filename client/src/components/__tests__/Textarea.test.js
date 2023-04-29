import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Textarea from '../Textarea';

describe('Textarea', () => {

  test('should call setParentValue after a delay when value changes', async () => {

    // Define a mock function that will be called when the parent component's value is set
    const setParentValueMock = jest.fn();

    // Render the Textarea component with the mock function
    const { getByPlaceholderText } = render(
      <Textarea placeholder="test" setParentValue={setParentValueMock} />
    );

    // Find the textarea element by its placeholder text
    const textarea = getByPlaceholderText('test');

    // Simulate a change event on the textarea, setting its value to 'test value'
    fireEvent.change(textarea, { target: { value: 'test value' } });

    // Wait for the setParentValueMock function to be called (after a delay)
    waitFor(() => expect(setParentValueMock).toHaveBeenCalled());
  });
});
