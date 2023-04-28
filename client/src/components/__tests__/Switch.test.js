import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Switch from '../Switch';

test('Switch toggles correctly', () => {
  const onToggleMock = jest.fn();
  const { getByRole } = render(<Switch isToggled={false} onToggle={onToggleMock} />);
  const switchToggle = getByRole('checkbox');

  fireEvent.click(switchToggle);

  expect(onToggleMock).toHaveBeenCalledTimes(1);
  expect(onToggleMock).toHaveBeenCalledWith(true);
  expect(switchToggle.querySelector('input')).toHaveAttribute('checked', '');
});