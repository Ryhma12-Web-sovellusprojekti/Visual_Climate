import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
//import { MockFirebase } from 'firebase-mock';
import LoginLinks from "../LoginLinks"
import { LoginForm } from '../LoginForms'
//import { useNavigate } from 'react-router-dom';


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


describe(("LoginForm tests"), () => {

    test("renders LoginForm content", () => {
        render(<LoginLinks />)
        const textElement = screen.getByText("Sign in to Continue")
        const emailPlacehoder = screen.getByPlaceholderText("Email...")
        const passwordPlacehoder = screen.getByPlaceholderText("Password...")
        const SignInButton = screen.getByRole('button', { name: /Submit/i })
        const googleTextElement = screen.getByText("Or use your Google account")
        const googleSignInButton = screen.getByRole('button', { name: /Sign in with Google/i })

        //screen.debug(textElement)
        //screen.debug(emailPlacehoder)
        //screen.debug(passwordPlacehoder)
        //screen.debug(SignInButton)
        //screen.debug(googleTextElement)
        //screen.debug(googleSignInButton)

        expect(textElement).toBeDefined()
        expect(emailPlacehoder).toBeDefined()
        expect(passwordPlacehoder).toBeDefined()
        expect(SignInButton).toBeDefined()
        expect(googleTextElement).toBeDefined()
        expect(googleSignInButton).toBeDefined()
    })

    test("does not show LoginForm when Sign Up button is clicked", async () => {
        const user = userEvent.setup()
        const { getByText, queryByText } = render(<LoginLinks />);
        const signUpButton = getByText("Sign Up");

        await user.click(signUpButton);
    
        const LoginFormText = queryByText("Sign in to Continue");
        expect(LoginFormText).toBeNull();
      });

    test(("LoginForm gives a note if email and password are missing"), async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);


        const SignInButton = screen.getByRole('button', { name: /Submit/i })
        await user.click(SignInButton)

        const emailMessage = screen.getByText("this is requred information")
        const passwordMessage = screen.getByText("password must be at least 6 characters")
        expect(emailMessage).toBeDefined()
        expect(passwordMessage).toBeDefined()
        expect(setIsAuth).not.toHaveBeenCalledWith(true)


    })

    test(("LoginForm gives a note if email is missing"), async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);


        const passwordInput = screen.getByPlaceholderText("Password...")
        const SignInButton = screen.getByRole('button', { name: /Submit/i })

        await user.type(passwordInput, 'Salasana12345!')
        await user.click(SignInButton)

        const emailMessage = screen.getByText("this is requred information")
        expect(emailMessage).toBeDefined()
        expect(setIsAuth).not.toHaveBeenCalledWith(true)


    })

    test(("LoginForm gives a note if email is not valid"), async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);

        const emailInput = screen.getByPlaceholderText("Email...")
        const passwordInput = screen.getByPlaceholderText("Password...")
        const SignInButton = screen.getByRole('button', { name: /Submit/i })

        await user.type(emailInput, "example.fi")
        await user.type(passwordInput, 'Salasana12345!')
        await user.click(SignInButton)

        const emailErrorMessage = screen.getByTestId("email-error");
        expect(emailErrorMessage).toBeInTheDocument()
        expect(setIsAuth).not.toHaveBeenCalledWith(true)


    })

    test(("LoginForm gives a note if password is missing"), async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);

        const emailInput = screen.getByPlaceholderText("Email...")
        const SignInButton = screen.getByRole('button', { name: /Submit/i })

        await user.type(emailInput, 'etunimi.sukunimi@sahkoposti.fi')
        await user.click(SignInButton)

        const message = screen.getByText("password must be at least 6 characters")
        expect(message).toBeDefined()
        expect(setIsAuth).not.toHaveBeenCalledWith(true)


    })

    test(("LoginForm gives a note if password is too short"), async () => {

        const user = userEvent.setup()

        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);

        const emailInput = screen.getByPlaceholderText("Email...")
        const passwordInput = screen.getByPlaceholderText("Password...")
        const SignInButton = screen.getByRole('button', { name: /Submit/i })

        await user.type(emailInput, 'etunimi.sukunimi@sahkoposti.fi')
        await user.type(passwordInput, 'Sala')
        await user.click(SignInButton)

        const message = screen.getByText("password must be at least 6 characters")
        expect(message).toBeDefined()
        expect(setIsAuth).not.toHaveBeenCalledWith(true)


    })

    test('successful login when Login Form receives correct email and password ', async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<LoginForm setIsAuth={setIsAuth} />);
        const emailInput = screen.getByPlaceholderText("Email...")
        const passwordInput = screen.getByPlaceholderText("Password...")
        const submitButton = screen.getByRole('button', { name: /Submit/i })

        await user.type(emailInput, 't1nies00@students.oamk.fi')
        await user.type(passwordInput, 'Salasana1234!')

        await user.click(submitButton);
        await waitFor(() => { expect(setIsAuth).toHaveBeenCalledWith(true) })
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/home');

    });

})

describe(("RegisterForm tests"), () => {
//testaa eihän sigup formi näy heti ensin

test("does not show RegisterForm by default", () => {
    const { queryByText } = render(<LoginLinks />);
    const registerForm = queryByText("Not registered yet? Sign up here!");

    expect(registerForm).toBeNull();
  });

  test("shows RegisterForm after Sign Up button is clicked", async () => {
    const user = userEvent.setup()
    const { getByText, queryByText } = render(<LoginLinks />);
    const signUpButton = getByText("Sign Up");

    await user.click(signUpButton);

    const registerFormText = queryByText("Not registered yet? Sign up here!");

    expect(registerFormText).toBeInTheDocument();
});
})