import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginLinks from "../LoginLinks"
import RegisterForm from '../LoginForms'
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

        //RegisterForm does not appear when the Sign up button is not clicked
        expect(registerForm).toBeNull();
    });

    test("shows form after Sign Up button is clicked", async () => {
        const user = userEvent.setup();
        const { getByText, queryByText } = render(<LoginLinks />);
        const signUpButton = getByText("Sign Up");

        await user.click(signUpButton);

        const registerFormText = queryByText("Not registered yet? Sign up here!");
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        //finds RegisterForm elements when the Sign up button is clicked
        expect(registerFormText).toBeInTheDocument();
        expect(firstNamePlacehoder).toBeInTheDocument();
        expect(lastNamePlacehoder).toBeInTheDocument();
        expect(emailPlacehoder).toBeInTheDocument();
        expect(passwordPlacehoder).toBeInTheDocument();
        expect(passwordConfPlacehoder).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('gives a note every input field where the data is missing', async () => {

        const user = userEvent.setup();
        render(<RegisterForm />);
        const submitButton = screen.queryByTestId("signup-submit");
        
        await user.click(submitButton);
        await expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        const fnInfo = screen.queryByTestId("firstname-info");
        const lnInfo = screen.queryByTestId("lastname-info");
        const emailInfo = screen.queryByTestId("email-info");
        const passwordInfo = screen.queryByTestId("password-info");
        const passwordConfInfo = screen.queryByTestId("password-confirmation-info");
        
        //finds info texts
        expect(fnInfo).toBeInTheDocument();
        expect(lnInfo).toBeInTheDocument();
        expect(emailInfo).toBeInTheDocument();
        expect(emailInfo).toBeInTheDocument();
        expect(passwordInfo).toBeInTheDocument();
        expect(passwordConfInfo).toBeInTheDocument();

    });

   test('RegisterForm gives a note if the email does not contain @ character', async () => {

        const user = userEvent.setup();
        render(<RegisterForm />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
        //email does not contain @ character
        await user.type(emailPlacehoder, 'example.fi');
        await user.type(passwordPlacehoder, 'password');
        await user.type(passwordConfPlacehoder, 'password');
        await user.click(submitButton);
        const emailInfo = screen.getByTestId("email-info");
        //does not let the user forward
        await expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        //finds emailInfo from the document
        expect(emailInfo).toBeInTheDocument();

    });

    test('gives a note if the email is not in the correct format', async () => {

        const user = userEvent.setup();
        render(<RegisterForm />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
         //email is not in the correct format
        await user.type(emailPlacehoder, '@example.fi');
        await user.type(passwordPlacehoder, 'password');
        await user.type(passwordConfPlacehoder, 'password');
        await user.click(submitButton);
        const emailInfo = screen.getByTestId("email-info");
        //does not let the user forward
        await expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        //finds emailInfo from the document
        expect(emailInfo).toBeInTheDocument();

    });

    test('gives a note if password is too short', async () => {

        const user = userEvent.setup();
        render(<RegisterForm />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
        await user.type(emailPlacehoder, 'name@example.fi');
        //password is too short, must be at least six characters
        await user.type(passwordPlacehoder, 'pass');
        await user.type(passwordConfPlacehoder, 'pass');
        await user.click(submitButton);
        const passwordInfo = screen.getByTestId("password-info");
        //does not let the user forward
        await expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        //finds passwordInfo from the document
        expect(passwordInfo).toBeInTheDocument();

    });

    test("gives a note if password and its confirmation don't match", async () => {
        const user = userEvent.setup();
        render(<RegisterForm />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
        await user.type(emailPlacehoder, 'name@example.fi');
        //password and confirmation are different
        await user.type(passwordPlacehoder, 'password');
        await user.type(passwordConfPlacehoder, 'passwodr');
        await user.click(submitButton);
        const passwordConfInfo = screen.getByTestId("password-confirmation-info"); 
        //does not let the user forward
        expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
        //finds password confimration info from the document
        expect(passwordConfInfo).toBeInTheDocument();

    });

    //a test email is created to test successful registration
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

        const user = userEvent.setup();

        render(<RegisterForm />);
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
        await user.type(emailPlacehoder, testAddress);
        await user.type(passwordPlacehoder, 'password555');
        await user.type(passwordConfPlacehoder, 'password555');

        await user.click(submitButton);

        //wait a little while so the user's data will be saved to the database
        await new Promise(resolve => setTimeout(resolve, 1500));
        //user is redirected to home when the registration is successful
        await expect(mockedUsedNavigate).toHaveBeenCalledWith('/home');
    });
    const deleteTestUser = async () => {
        const user = auth.currentUser; 
        if (user) {
          await user.delete(); 
        }
      };
      //delete tests user after tests are done
      afterAll(async () => {
        await deleteTestUser();
      });
});