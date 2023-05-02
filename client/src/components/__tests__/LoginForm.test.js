import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginLinks from "../LoginLinks"
import { LoginForm } from '../LoginForms'

// Create a jest-mock function for the useNavigate hook
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


describe(("LoginForm tests"), () => {

    test("renders content by default when LoginLinks is been rendered", () => {

        // Render the LoginLinks component
        render(<LoginLinks />);

        // Get elements
        const textElement = screen.getByText("Sign in to Continue");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const SignInButton = screen.getByTestId("signin-submit");
        const googleTextElement = screen.getByText("Or use your Google account");
        const googleSignInButton = screen.getByRole('button', { name: /Sign in with Google/i });

        // Check that all elements of the LoginForm component are defined
        expect(textElement).toBeDefined();
        expect(emailPlacehoder).toBeDefined();
        expect(passwordPlacehoder).toBeDefined();
        expect(SignInButton).toBeDefined();
        expect(googleTextElement).toBeDefined();
        expect(googleSignInButton).toBeDefined();
    })

    test("does not show when Sign Up button is clicked", async () => {

        // Initialize userEvent
        const user = userEvent.setup();

        // Render the LoginLinks component
        const { getByText, queryByText } = render(<LoginLinks />);
        const signUpButton = getByText("Sign Up");

        // Simulate a click on the signUpButton element
        await user.click(signUpButton); 
        const LoginFormText = queryByText("Sign in to Continue");

        // Check that the LoginFormText element does not exist
        expect(LoginFormText).toBeNull();
    });

    test(("gives a note if email and password are missing"), async () => {

        // Initialize userEvent
        const user = userEvent.setup();

        // Render the LoginForm component
        render(<LoginForm />);

        // Get the Sign In button element and click it
        const SignInButton = screen.getByTestId("signin-submit");
        await user.click(SignInButton);

        // Check that the email and password error messages are defined
        expect(screen.getByTestId("email-error")).toBeDefined();
        expect(screen.getByTestId("password-error")).toBeDefined();

        // Check that useNavigate has not been called with '/home'
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
    });

    test(("gives a note if email is missing"), async () => {

        // Initialize userEvent
        const user = userEvent.setup();

        // Render the LoginForm component
        render(<LoginForm />);

        // Get the password input and Sign In button elements
        const passwordInput = screen.getByPlaceholderText("Password...");
        const SignInButton = screen.getByTestId("signin-submit");

        // Enter the password and click the Sign In button
        await user.type(passwordInput, 'Password');
        await user.click(SignInButton);

        // Check that the email error message is defined
        expect(screen.getByTestId("email-error")).toBeDefined();

        // Check that useNavigate has not been called with '/home'
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
    });

    test(("gives a note if email is not valid"), async () => {

        // Initialize userEvent
        const user = userEvent.setup();

        // Render the LoginForm component
        render(<LoginForm />);

        // Enter an invalid email, the password and click the Sign In button
        const emailInput = screen.getByPlaceholderText("Email...");
        const passwordInput = screen.getByPlaceholderText("Password...");
        const SignInButton = screen.getByTestId("signin-submit");

        // Enter an invalid email, the password and click the Sign In button
        await user.type(emailInput, "example.fi");
        await user.type(passwordInput, 'Password');
        await user.click(SignInButton);

        // Check that the email error message is defined
        expect(screen.getByTestId("email-error")).toBeInTheDocument();

        // Check that useNavigate has not been called with '/home'
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
    });

    test(("gives a note if password is missing"), async () => {

        // Initialize userEvent
        const user = userEvent.setup();

        // Render the LoginForm component
        render(<LoginForm />);

        // Get the email input and Sign In button elements
        const emailInput = screen.getByPlaceholderText("Email...");
        const SignInButton = screen.getByTestId("signin-submit");

        // Enter the email and click the Sign In button
        await user.type(emailInput, 'essi@example.fi');
        await user.click(SignInButton);

        // Check that the password error message is defined
        expect(screen.getByTestId("password-error")).toBeDefined();

        // Check that useNavigate has not been called with '/home'
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
    });

    test(("gives a note if password is too short"), async () => {

        // Initialize userEvent
        const user = userEvent.setup();

        // Render the LoginForm component
        render(<LoginForm />);

        // Enter too short password, the email and click the Sign In button
        const emailInput = screen.getByPlaceholderText("Email...");
        const passwordInput = screen.getByPlaceholderText("Password...");
        const SignInButton = screen.getByTestId("signin-submit");

        // Type in email and a password that is too short
        await user.type(emailInput, 'essi@example.fi');
        await user.type(passwordInput, 'Pass');
        await user.click(SignInButton);

        // Check that password error message is displayed
        expect(screen.getByTestId("password-error")).toBeDefined();

        // Check that useNavigate has not been called with '/home'
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
    });

    test('login fails when email is incorrect', async () => {

        // Initialize userEvent
        const user = userEvent.setup();

        // Render the LoginForm component
        render(<LoginForm />);

        // Enter correct credentials and click the Sign In button
        const emailInput = screen.getByPlaceholderText("Email...");
        const passwordInput = screen.getByPlaceholderText("Password...");
        const submitButton = screen.getByTestId("signin-submit");

        // Type incorrect email
        await user.type(emailInput, 'essi@xmple.fi');
        await user.type(passwordInput, 'Password');
        await user.click(submitButton);

        // Check that error messages is shown
        await waitFor(() => {
            expect(screen.getByText("Incorrect email or password. Please try again.")).toBeInTheDocument();
        });
    });

    test('login fails when password is incorrect', async () => {

        // Initialize userEvent
        const user = userEvent.setup();

        // Render the LoginForm component
        render(<LoginForm />);

        // Enter correct credentials and click the Sign In button
        const emailInput = screen.getByPlaceholderText("Email...");
        const passwordInput = screen.getByPlaceholderText("Password...");
        const submitButton = screen.getByTestId("signin-submit");

        // Type incorrect password
        await user.type(emailInput, 'essi@example.fi');
        await user.type(passwordInput, 'Passwro');
        await user.click(submitButton);

        // Check that error messages is shown
        await waitFor(() => {
            expect(screen.getByText("Incorrect email or password. Please try again.")).toBeInTheDocument();
        });
    });

    test('successful login when form receives correct email and password', async () => {

        // Initialize userEvent
        const user = userEvent.setup();

        // Render the LoginForm component
        render(<LoginForm />);

        // Enter correct credentials and click the Sign In button
        const emailInput = screen.getByPlaceholderText("Email...");
        const passwordInput = screen.getByPlaceholderText("Password...");
        const submitButton = screen.getByTestId("signin-submit");

        // Type in the correct email and password
        await user.type(emailInput, 'essi@example.fi');
        await user.type(passwordInput, 'Password');
        await user.click(submitButton);

        // Check that no error messages are displayed
        expect(screen.queryByTestId("password-error")).toBeNull();
        expect(screen.queryByTestId("email-error")).toBeNull();

        // Check that useNavigate has been called with '/home'
        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/home');
        });
    });
});
