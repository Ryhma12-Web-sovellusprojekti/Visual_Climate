import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Profile from "../../pages/Profile"

describe(("Delete user component test"), () => {

    test("Renders Profile element where the Delete Account button is", async () => {

        // Render the Profile component and save the "Delete Account" button to a variable
        render(<Profile />);
        const deleteButton = screen.getByText('Delete Account');
        fireEvent.click(deleteButton);

        // Simulate clicking the "Delete Account" button and wait for the "Are you sure?" box to appear
        await waitFor(() =>
            expect(screen.getByText('Are you sure?')).toBeInTheDocument());
            expect(screen.getByText('Yes')).toBeInTheDocument();
            expect(screen.getByText('No')).toBeInTheDocument();
    });
});
