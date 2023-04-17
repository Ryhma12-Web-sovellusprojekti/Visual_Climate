import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginLinks from "../LoginLinks"
import RegisterForm from '../LoginForms'

import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../../firebase-config";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe(("RegisterForm tests"), () => {

    test("does not show RegisterForm by default", () => {
        const { queryByText } = render(<LoginLinks />);
        const registerForm = queryByText("Not registered yet? Sign up here!");

        expect(registerForm).toBeNull();
    });

    test("shows form after Sign Up button is clicked", async () => {
        const user = userEvent.setup()
        const { getByText, queryByText } = render(<LoginLinks />);
        const signUpButton = getByText("Sign Up");

        await user.click(signUpButton);

        const registerFormText = queryByText("Not registered yet? Sign up here!");
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...")
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...")
        const emailPlacehoder = screen.getByPlaceholderText("Email...")
        const usernamePlacehoder = screen.getByPlaceholderText("Username...")
        const passwordPlacehoder = screen.getByPlaceholderText("Password...")
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...")
        const submitButton = screen.getByTestId("signup-submit");

        expect(registerFormText).toBeInTheDocument();
        expect(firstNamePlacehoder).toBeInTheDocument();
        expect(lastNamePlacehoder).toBeInTheDocument();
        expect(emailPlacehoder).toBeInTheDocument();
        expect(usernamePlacehoder).toBeInTheDocument();
        expect(passwordPlacehoder).toBeInTheDocument();
        expect(passwordConfPlacehoder).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('gives a note every input field where the data is missing', async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<RegisterForm setIsAuth={setIsAuth} />);
        const submitButton = screen.queryByTestId("signup-submit");
        
        await user.click(submitButton);
        await waitFor(() => { expect(setIsAuth).not.toHaveBeenCalledWith(true) })
        await expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        const fnInfo = screen.queryByTestId("firstname-info");
        const lnInfo = screen.queryByTestId("lastname-info");
        const emailInfo = screen.queryByTestId("email-info");
        const usernameInfo = screen.queryByTestId("username-info");
        const passwordInfo = screen.queryByTestId("password-info");
        const passwordConfInfo = screen.queryByTestId("password-confirmation-info");
        
        expect(fnInfo).toBeInTheDocument();
        expect(lnInfo).toBeInTheDocument();
        expect(emailInfo).toBeInTheDocument();
        expect(emailInfo).toBeInTheDocument();
        expect(usernameInfo).toBeInTheDocument();
        expect(passwordInfo).toBeInTheDocument();
        expect(passwordConfInfo).toBeInTheDocument();

    });

   test('RegisterForm gives a note if the email does not contain @ character', async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<RegisterForm setIsAuth={setIsAuth} />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...")
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...")
        const emailPlacehoder = screen.getByPlaceholderText("Email...")
        const usernamePlacehoder = screen.getByPlaceholderText("Username...")
        const passwordPlacehoder = screen.getByPlaceholderText("Password...")
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...")
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname')
        await user.type(lastNamePlacehoder, 'Lastname')
        await user.type(emailPlacehoder, 'example.fi')
        await user.type(usernamePlacehoder, 'username')
        await user.type(passwordPlacehoder, 'password')
        await user.type(passwordConfPlacehoder, 'password')
        await user.click(submitButton);
        const emailInfo = screen.getByTestId("email-info");
        await waitFor(() => { expect(setIsAuth).not.toHaveBeenCalledWith(true) })
        await expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        expect(emailInfo).toBeInTheDocument();

    });

    test('gives a note if the email is not in the correct format', async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<RegisterForm setIsAuth={setIsAuth} />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...")
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...")
        const emailPlacehoder = screen.getByPlaceholderText("Email...")
        const usernamePlacehoder = screen.getByPlaceholderText("Username...")
        const passwordPlacehoder = screen.getByPlaceholderText("Password...")
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...")
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname')
        await user.type(lastNamePlacehoder, 'Lastname')
        await user.type(emailPlacehoder, '@example.fi')
        await user.type(usernamePlacehoder, 'username')
        await user.type(passwordPlacehoder, 'password')
        await user.type(passwordConfPlacehoder, 'password')
        await user.click(submitButton);
        const emailInfo = screen.getByTestId("email-info");
        await waitFor(() => { expect(setIsAuth).not.toHaveBeenCalledWith(true) })
        await expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        expect(emailInfo).toBeInTheDocument();

    });

    test('gives a note if password is too short', async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<RegisterForm setIsAuth={setIsAuth} />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...")
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...")
        const emailPlacehoder = screen.getByPlaceholderText("Email...")
        const usernamePlacehoder = screen.getByPlaceholderText("Username...")
        const passwordPlacehoder = screen.getByPlaceholderText("Password...")
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...")
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname')
        await user.type(lastNamePlacehoder, 'Lastname')
        await user.type(emailPlacehoder, 'name@example.fi')
        await user.type(usernamePlacehoder, 'username')
        await user.type(passwordPlacehoder, 'pass')
        await user.type(passwordConfPlacehoder, 'pass')
        await user.click(submitButton);
        const passwordInfo = screen.getByTestId("password-info");
        await waitFor(() => { expect(setIsAuth).not.toHaveBeenCalledWith(true) })
        await expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        expect(passwordInfo).toBeInTheDocument();

    });

    test("gives a note if password and its confirmation don't match", async () => {
        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        render(<RegisterForm setIsAuth={setIsAuth} />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...")
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...")
        const emailPlacehoder = screen.getByPlaceholderText("Email...")
        const usernamePlacehoder = screen.getByPlaceholderText("Username...")
        const passwordPlacehoder = screen.getByPlaceholderText("Password...")
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...")
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname')
        await user.type(lastNamePlacehoder, 'Lastname')
        await user.type(emailPlacehoder, 'name@example.fi')
        await user.type(usernamePlacehoder, 'username')
        await user.type(passwordPlacehoder, 'password')
        await user.type(passwordConfPlacehoder, 'passwodr')
        await user.click(submitButton);
        const passwordConfInfo = screen.getByTestId("password-confirmation-info"); 
        waitFor(() => { expect(setIsAuth).not.toHaveBeenCalledWith(true) })
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        expect(passwordConfInfo).toBeInTheDocument();

    });

    function generateTestEmailAddress() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear());
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timestamp = `${day}${month}${year}${hours}${minutes}`;
        const emailAddress = `test${timestamp}@example.com`;
        return emailAddress;
      }
      const testAddress = generateTestEmailAddress();
    test('successful sign up when form receives correct information', async () => {

        const user = userEvent.setup()
        const setIsAuth = jest.fn();
        const navigate = jest.fn();

        render(<RegisterForm setIsAuth={setIsAuth} navigate={navigate} />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...")
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...")
        const emailPlacehoder = screen.getByPlaceholderText("Email...")
        const usernamePlacehoder = screen.getByPlaceholderText("Username...")
        const passwordPlacehoder = screen.getByPlaceholderText("Password...")
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...")
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname')
        await user.type(lastNamePlacehoder, 'Lastname')
        await user.type(emailPlacehoder, testAddress)
        await user.type(usernamePlacehoder, 'username')
        await user.type(passwordPlacehoder, 'password555')
        await user.type(passwordConfPlacehoder, 'password555')

        await user.click(submitButton);

        await new Promise(resolve => setTimeout(resolve, 1500));
        await waitFor(() => { expect(setIsAuth).toHaveBeenCalledWith(true) })
        await expect(mockedUsedNavigate).toHaveBeenCalledWith('/home');
    });
    const deleteTestUser = async () => {
        const user = auth.currentUser; // Get current user
        if (user) {
          await user.delete(); // Delete current user
        }
      };
      afterAll(async () => {
        await deleteTestUser();
      });
})