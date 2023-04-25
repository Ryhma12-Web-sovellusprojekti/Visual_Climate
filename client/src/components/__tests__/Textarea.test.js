import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Textarea from '../Textarea';

describe('Textarea', () => {
  test('should call setParentValue after a delay when value changes', async () => {
    const setParentValueMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Textarea placeholder="test" setParentValue={setParentValueMock} />
    );
    const textarea = getByPlaceholderText('test');
    fireEvent.change(textarea, { target: { value: 'test value' } });
    waitFor(() => expect(setParentValueMock).toHaveBeenCalled());
  });
});