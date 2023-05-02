import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginLinks from "../LoginLinks"
import RegisterForm from '../LoginForms'

// Create a jest-mock function for the useNavigate hook
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe(("RegisterForm tests"), () => {

    test("does not show RegisterForm by default", () => {

        // Render the LoginLinks component and get the queryByText function from the result
        const { queryByText } = render(<LoginLinks />);

        // Query the page for the text "Not registered yet? Sign up here!"
        const registerForm = queryByText("Not registered yet? Sign up here!");

        // Assert that the registerForm element is not in the document
        expect(registerForm).toBeNull();
    });
    
    test("shows form after Sign Up button is clicked", async () => {

        // Set up the user event library
        const user = userEvent.setup();

        // Render the LoginLinks component and get the getByText and queryByText functions from the result
        const { getByText, queryByText } = render(<LoginLinks />);

        // Get the "Sign Up" button
        const signUpButton = getByText("Sign Up");

        // Simulate a user clicking the "Sign Up" button
        await user.click(signUpButton);

        // Query the page for various elements that should be present in the RegisterForm
        const registerFormText = queryByText("Not registered yet? Sign up here!");
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        // Assert that all of the expected elements are in the document
        expect(registerFormText).toBeInTheDocument();
        expect(firstNamePlacehoder).toBeInTheDocument();
        expect(lastNamePlacehoder).toBeInTheDocument();
        expect(emailPlacehoder).toBeInTheDocument();
        expect(passwordPlacehoder).toBeInTheDocument();
        expect(passwordConfPlacehoder).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('gives a note every input field where the data is missing', async () => {

        // Set up the user event library
        const user = userEvent.setup();

        // Render the RegisterForm component
        render(<RegisterForm />);

        // Get the "submit" button
        const submitButton = screen.queryByTestId("signup-submit");

        // Simulate a user clicking the "submit" button without entering any data
        await user.click(submitButton);

        // Find info texts for each input field
        const fnInfo = screen.queryByTestId("firstname-info");
        const lnInfo = screen.queryByTestId("lastname-info");
        const emailInfo = screen.queryByTestId("email-info");
        const passwordInfo = screen.queryByTestId("password-info");
        const passwordConfInfo = screen.queryByTestId("password-confirmation-info");

        // Verify that all the info texts are present in the document
        expect(fnInfo).toBeInTheDocument();
        expect(lnInfo).toBeInTheDocument();
        expect(emailInfo).toBeInTheDocument();
        expect(emailInfo).toBeInTheDocument();
        expect(passwordInfo).toBeInTheDocument();
        expect(passwordConfInfo).toBeInTheDocument();

    });

    test('RegisterForm gives a note if the email does not contain @ character', async () => {

        // Set up the user event library
        const user = userEvent.setup();

        // Render the RegisterForm component
        render(<RegisterForm />);

        // Get the input fields
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        // Simulate a user entering data without '@' character in email
        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
        await user.type(emailPlacehoder, 'example.fi');
        await user.type(passwordPlacehoder, 'password');
        await user.type(passwordConfPlacehoder, 'password');
        await user.click(submitButton);

        // Find the email info text and verify that it is present in the document
        const emailInfo = screen.getByTestId("email-info");
        expect(emailInfo).toBeInTheDocument();
    });

    test('gives a note if the email is not in the correct format', async () => {

        // Set up the user event library
        const user = userEvent.setup();

        // Render the RegisterForm component
        render(<RegisterForm />);

        // Get the input fields
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

        //finds emailInfo from the document
        expect(emailInfo).toBeInTheDocument();

    });

    test('gives a note if password is too short', async () => {

        // Set up the user event library
        const user = userEvent.setup();

        // Render the RegisterForm component
        render(<RegisterForm />);

        // Get the input fields
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        // Simulate a user entering too short password
        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
        await user.type(emailPlacehoder, 'name@example.fi');
        await user.type(passwordPlacehoder, 'pass');
        await user.type(passwordConfPlacehoder, 'pass');
        await user.click(submitButton);
        const passwordInfo = screen.getByTestId("password-info");

        //finds passwordInfo from the document
        expect(passwordInfo).toBeInTheDocument();
    });

    test("gives a note if password and its confirmation don't match", async () => {

        // Set up the user event library
        const user = userEvent.setup();

        // Render the RegisterForm component
        render(<RegisterForm />);

        // Get the input fields
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        // Simulate a user entering wrong password
        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
        await user.type(emailPlacehoder, 'name@example.fi');
        await user.type(passwordPlacehoder, 'password');
        await user.type(passwordConfPlacehoder, 'passwodr');
        await user.click(submitButton);
        const passwordConfInfo = screen.getByTestId("password-confirmation-info"); 

        //finds passwordConfInfo from the document
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

        // Set up the user event library
        const user = userEvent.setup();

        // Render the RegisterForm component
        render(<RegisterForm />);

        // Get the input fields
        const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
        const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
        const emailPlacehoder = screen.getByPlaceholderText("Email...");
        const passwordPlacehoder = screen.getByPlaceholderText("Password...");
        const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");
        const submitButton = screen.getByTestId("signup-submit");

        // Simulate a user entering correct credentials
        await user.type(firstNamePlacehoder, 'Firstname');
        await user.type(lastNamePlacehoder, 'Lastname');
        await user.type(emailPlacehoder, testAddress);
        await user.type(passwordPlacehoder, 'password555');
        await user.type(passwordConfPlacehoder, 'password555');
        await user.click(submitButton);
    });
});
