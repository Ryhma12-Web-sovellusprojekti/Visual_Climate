import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginLinks from "../LoginLinks"
import { LoginForm } from '../LoginForms'


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


describe(("LoginForm tests"), () => {

    test("renders content by default when LoginLinks is been rendered", () => {
        render(<LoginLinks />);
        const textElement = screen.getByText("Sign in to Continue");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const SignInButton = screen.getByTestId("signin-submit");
        const googleTextElement = screen.getByText("Or use your Google account");
        const googleSignInButton = screen.getByRole('button', { name: /Sign in with Google/i });

        //finds all the LoginForm elements
        expect(textElement).toBeDefined();
        expect(emailPlacehoder).toBeDefined();
        expect(passwordPlacehoder).toBeDefined();
        expect(SignInButton).toBeDefined();
        expect(googleTextElement).toBeDefined();
        expect(googleSignInButton).toBeDefined();
    })

    test("does not show when Sign Up button is clicked", async () => {
        const user = userEvent.setup();
        const { getByText, queryByText } = render(<LoginLinks />);
        const signUpButton = getByText("Sign Up");

        await user.click(signUpButton); 
        const LoginFormText = queryByText("Sign in to Continue");
        //not showing the LoginForm text element
        expect(LoginFormText).toBeNull();
    });

    test(("gives a note if email and password are missing"), async () => {

        const user = userEvent.setup();
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);


        const SignInButton = screen.getByTestId("signin-submit");
        //nothing is written to email and password input elements
        await user.click(SignInButton);

        //finds email and password info texts
        expect(screen.getByTestId("email-error")).toBeDefined();
        expect(screen.getByTestId("password-error")).toBeDefined();
        //does not let the user forward
        expect(setIsAuth).not.toHaveBeenCalledWith(true);
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');


    });

    test(("gives a note if email is missing"), async () => {

        const user = userEvent.setup();
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);


        const passwordInput = screen.getByPlaceholderText("Password...");
        const SignInButton = screen.getByTestId("signin-submit");

        await user.type(passwordInput, 'Password');
        //nothing is written to email input element
        await user.click(SignInButton);

        //finds email info texts
        expect(screen.getByTestId("email-error")).toBeDefined();
        //does not let the user forward
        expect(setIsAuth).not.toHaveBeenCalledWith(true);
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');

    });

    test(("gives a note if email is not valid"), async () => {

        const user = userEvent.setup();
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);

        const emailInput = screen.getByPlaceholderText("Email...");
        const passwordInput = screen.getByPlaceholderText("Password...");
        const SignInButton = screen.getByTestId("signin-submit");

        //email is not valid
        await user.type(emailInput, "example.fi");
        await user.type(passwordInput, 'Password');
        await user.click(SignInButton);

        //finds email info texts
        expect(screen.getByTestId("email-error")).toBeInTheDocument();
        //does not let the user forward
        expect(setIsAuth).not.toHaveBeenCalledWith(true);
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');


    });

    test(("gives a note if password is missing"), async () => {

        const user = userEvent.setup();
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);

        const emailInput = screen.getByPlaceholderText("Email...");
        const SignInButton = screen.getByTestId("signin-submit");

        await user.type(emailInput, 'essi@example.fi');
        //nothing is written to password input element
        await user.click(SignInButton);

        //finds password info texts
        expect(screen.getByTestId("password-error")).toBeDefined();
        //does not let the user forward
        expect(setIsAuth).not.toHaveBeenCalledWith(true);
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');


    });

    test(("gives a note if password is too short"), async () => {

        const user = userEvent.setup();

        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);

        const emailInput = screen.getByPlaceholderText("Email...");
        const passwordInput = screen.getByPlaceholderText("Password...");
        const SignInButton = screen.getByTestId("signin-submit");

        await user.type(emailInput, 'essi@example.fi');
        //password is too short, must be at least six characters
        await user.type(passwordInput, 'Pass');
        await user.click(SignInButton);

        //finds password info texts
        expect(screen.getByTestId("password-error")).toBeDefined();
        //does not let the user forward
        expect(setIsAuth).not.toHaveBeenCalledWith(true);
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');


    });

    test('successful login when form receives correct email and password', async () => {

        const user = userEvent.setup();
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);
        const emailInput = screen.getByPlaceholderText("Email...");
        const passwordInput = screen.getByPlaceholderText("Password...");
        const submitButton = screen.getByTestId("signin-submit");

        await user.type(emailInput, 'essi@example.fi');
        await user.type(passwordInput, 'Password');

        await user.click(submitButton);

        //info texts are not found when the given information is correct
        expect(screen.queryByTestId("password-error")).toBeNull();
        expect(screen.queryByTestId("email-error")).toBeNull();
        //isAuth variable is set true when when the login is successful
        await waitFor(() => { expect(setIsAuth).toHaveBeenCalledWith(true) });
        //user is redirected to home when the login is successful
        await expect(mockedUsedNavigate).toHaveBeenCalledWith('/home');
        

    });

});