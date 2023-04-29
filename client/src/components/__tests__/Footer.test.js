import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

afterEach(() => {

    // Remove all rendered elements after each test
    cleanup();
});

test('Footer manual test', () => {

    // Render the Footer component
    render(<Footer/>);

    // Get the element of the Footer component that has the "data-testid" property "Footer1"
    const footerElement = screen.getByTestId('Footer1');

    // Check that the element exists
    expect(footerElement).toBeInTheDocument;

    // Check that the element contains the correct text
    expect(footerElement).toHaveTextContent('© Ryhmä 12 2023');

    // Check that the element contains the correct HTML structure
    expect(footerElement).toContainHTML('<footer data-testid="Footer1">© Ryhmä 12 2023</footer>');
}); 

test('Matches Footer snapshot', () =>{

    // Create a snapshot image of the Footer component and save it in JSON format
    const tree = renderer.create(<Footer />).toJSON();

    // Check if the snapshot of the Footer component matches the saved snapshot image
    expect(tree).toMatchSnapshot();
});
