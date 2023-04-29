import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Profile from "../../pages/Profile"
import RegisterForm, { LoginForm } from '../LoginForms'

// Create a variable named "mockedUsedNavigate" and set it as a Jest mock function
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe(("Delete account tests"), () => {

    test('create an test account with RegisterForm', async () => {

        // Import the userEvent module settings
        const user = userEvent.setup();

        // Render the RegisterForm component and save its elements to variables
        render(<RegisterForm />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        // Enter the user's information in the input fields using the userEvent module
        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
        await user.type(emailPlacehoder, "example@example.fi");
        await user.type(passwordPlacehoder, 'password555');
        await user.type(passwordConfPlacehoder, 'password555');

        // Simulate clicking the submit button and wait for the user's information to be saved to the database
        await user.click(submitButton);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Check that the user has been redirected to the correct path (home)
        await expect(mockedUsedNavigate).toHaveBeenCalledWith('/home');
    });

    test("deletes current user when Delete Account button is clicked", async () => {

        // Render the Profile component and save the "Delete Account" button to a variable
        render(<Profile />);
        const deleteButton = screen.getByText('Delete Account');
        fireEvent.click(deleteButton);

        // Simulate clicking the "Delete Account" button and wait for the "Are you sure?" text to appear
        await waitFor(() =>
            expect(screen.getByText('Are you sure?')).toBeInTheDocument());
            const yesButton = screen.getByText('Yes');
            fireEvent.click(yesButton);

              // Wait for a moment for the user data to be deleted from the database
            await new Promise(resolve => setTimeout(resolve, 1500));
    });

    // Test that the user has been deleted from the database and can no longer log in
    test("created user is been deleted from Firebase and can't log in", async () => {

        // Initialize the userEvent library
        const user = userEvent.setup();

        // Render the LoginForm component and save its elements to variables
        render(<LoginForm />);
        const emailInput = screen.getByPlaceholderText("Email...");
        const passwordInput = screen.getByPlaceholderText("Password...");
        const submitButton = screen.getByTestId("signin-submit");

        // Wait for the user to input their information
        await user.type(emailInput, 'example@example.fi');
        await user.type(passwordInput, 'password555');
        await user.click(submitButton);

        // The browser path should not be /home
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
    });
});
