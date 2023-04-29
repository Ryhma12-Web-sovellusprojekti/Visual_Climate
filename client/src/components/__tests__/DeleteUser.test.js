import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Profile from "../../pages/Profile"
import RegisterForm, { LoginForm } from '../LoginForms'

// Luodaan muuttuja nimeltä "mockedUsedNavigate" ja asetetaan se Jestin mock-funktioksi
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe(("Delete account tests"), () => {

  // Tämä testaa rekisteröitymisen luomalla käyttäjän käyttäen RegisterForm-komponenttia
  test('create an test account with RegisterForm', async () => {

    // Tuodaan userEvent-moduulin asetukset
    const user = userEvent.setup();

    // Renderöi RegisterForm-komponentin ja tallenna muuttujiin sen 
    render(<RegisterForm />);

    //Haetaan kenttiä elementit placeholderin perusteella
    const firstNamePlacehoder = screen.getByPlaceholderText("First Name...");
    const lastNamePlacehoder = screen.getByPlaceholderText("Last Name...");
    const emailPlacehoder = screen.getByPlaceholderText("Email...");
    const passwordPlacehoder = screen.getByPlaceholderText("Password...");
    const passwordConfPlacehoder = screen.getByPlaceholderText("Password confirmation...");

    //Haetaan submit-nappula test id:n perusteella
    const submitButton = screen.getByTestId("signup-submit");

    // Syöttää käyttäjän tiedot input-kenttiin käyttäen userEvent-moduulia
    await user.type(firstNamePlacehoder, 'Firstname');
    await user.type(lastNamePlacehoder, 'Lastname');
    await user.type(emailPlacehoder, "example@example.fi");
    await user.type(passwordPlacehoder, 'password555');
    await user.type(passwordConfPlacehoder, 'password555');

    // Simuloi submit-napin klikkauksen ja odottaa, että käyttäjän tiedot tallennetaan tietokantaan
    await user.click(submitButton);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Tarkistus, että käyttäjä on ohjattu oikeaan polkuun (home)
    await expect(mockedUsedNavigate).toHaveBeenCalledWith('/home');
  });

  // Tämä testaa käyttäjän tilin poistamista
  test("deletes current user when Delete Account button is clicked", async () => {

    // Renderöi Profile-komponentin
    render(<Profile />);
    // tallennus "Delete Account" -nappi muuttujaan
    const deleteButton = screen.getByText('Delete Account');
    fireEvent.click(deleteButton);

    // Simuloi "Delete Account" -napin klikkauksen ja odottaa, että "Are you sure?" -teksti tulee näkyviin
    await waitFor(() =>
      expect(screen.getByText('Are you sure?')).toBeInTheDocument());
    const yesButton = screen.getByText('Yes');
    fireEvent.click(yesButton);

    // Odotetaan hetki, että user data on poistettu tietokannasta
    await new Promise(resolve => setTimeout(resolve, 1500));
  });

  // Luodaan testi, joka tarkistaa että käyttäjä poistetaan tietokannasta ja ettei käyttäjä voi enää kirjautua sisään
  test("created user is been deleted from Firebase and can't log in", async () => {

    // Alustetaan userEvent-kirjasto
    const user = userEvent.setup();

    // Renderöidään LoginForm-komponentti
    render(<LoginForm />);

    // Haetaan kenttiä elementit placeholderin perusteella
    const emailInput = screen.getByPlaceholderText("Email...");
    const passwordInput = screen.getByPlaceholderText("Password...");

    // Haetaan submit-nappula test id:n perusteella
    const submitButton = screen.getByTestId("signin-submit");

    // Odotetaan käyttäjän syötöt
    await user.type(emailInput, 'example@example.fi');
    await user.type(passwordInput, 'password555');
    await user.click(submitButton);

    // Selaimen polku ei saa olla /home
    expect(mockedUsedNavigate).not.toHaveBeenCalledWith('/home');
  });

});
