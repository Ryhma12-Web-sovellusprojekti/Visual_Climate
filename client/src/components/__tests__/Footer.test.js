import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

afterEach(() => {

    // Poistetaan kaikki piirretyt elementit jokaisen testin jälkeen
    cleanup();
});

test('Footer manual test', () => {

    // Renderöidään footer-komponentti
    render(<Footer/>);

    // Haetaan Footer-komponentin elementti, jolla on "data-testid" -ominaisuus "Footer1"
    const footerElement = screen.getByTestId('Footer1');

    // Tarkistetaan, että elementti on olemassa
    expect(footerElement).toBeInTheDocument;

    // Tarkistetaan, että elementti sisältää oikean tekstin
    expect(footerElement).toHaveTextContent('© Ryhmä 12 2023');

    // Tarkistetaan, että elementti sisältää oikean HTML-rakenteen
    expect(footerElement).toContainHTML('<footer data-testid="Footer1">© Ryhmä 12 2023</footer>');
}); 

test('Matches Footer snapshot', () =>{

    // Luodaan Footer-komponentin kuva (snapshot) ja tallennetaan se JSON-muotoon
    const tree = renderer.create(<Footer />).toJSON();

    // Tarkistetaan, vastaako Footer-komponentin kuva tallennettua kuvaa
    expect(tree).toMatchSnapshot();
});
