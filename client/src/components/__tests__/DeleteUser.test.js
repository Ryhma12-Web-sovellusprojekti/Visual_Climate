import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Profile from "../../pages/Profile";
import RegisterForm, { LoginForm } from '../LoginForms';
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

/*moduleNameMapper: {
  '^axios$': require.resolve('axios'),
}*/


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


const mock = new MockAdapter(axios);

describe(("Delete account tests"), () => {

  test('create an test account with RegisterForm', async () => {
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
    await user.type(emailPlacehoder, "testikayttaja@example.fi");
    await user.type(passwordPlacehoder, 'password555');
    await user.type(passwordConfPlacehoder, 'password555');

    await user.click(submitButton);

    //mock.onPost('http://localhost:5000/createuser').reply(201, 'User created successfully!'); 
    // Call the API endpoint 
    //const response = await axios.post('http://localhost:5000/createuser'); 
    // Verify the response data 
    //expect(response.status).toBe(201); 
    //expect(response.data).toEqual('User created successfully!'); 
    //Wait a little while so the user's data will be saved in the database
    await new Promise(resolve => setTimeout(resolve, 1500));
    //user is redirected to home when the registration is successful
    await expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    

  });
/*
  test("deletes current user when Delete Account button is clicked", async () => {

    render(<Profile />);

    const deleteButton = screen.getByText('Delete Account');

    fireEvent.click(deleteButton);

    await waitFor(() =>
      expect(screen.getByText('Are you sure?')).toBeInTheDocument());

    const yesButton = screen.getByText('Yes');
    fireEvent.click(yesButton);

    //Wait a little while so the user's data will be deleted from the database
    await new Promise(resolve => setTimeout(resolve, 1500));

  });

  test("created user is been deleted from Firebase and can't log in", async () => {

    const user = userEvent.setup();
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText("Email...");
    const passwordInput = screen.getByPlaceholderText("Password...");
    const submitButton = screen.getByTestId("signin-submit");


    await user.type(emailInput, 'example@example.fi');
    await user.type(passwordInput, 'password555');
    await user.click(submitButton);

    //browser path should not be /home
    expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');

  });
*/
});



