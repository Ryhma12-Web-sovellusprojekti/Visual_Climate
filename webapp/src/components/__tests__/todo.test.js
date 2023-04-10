import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

afterEach(() => {
    cleanup();
});

test('Footer manual test', () => {
    render(<Footer/>);
    const footerElement = screen.getByTestId('Footer1');
    expect(footerElement).toBeInTheDocument;
    expect(footerElement).toHaveTextContent('© Ryhmä 12 2023');
    expect(footerElement).toContainHTML('<footer data-testid="Footer1">© Ryhmä 12 2023</footer>');
}); 

test('Matches snapshot', () =>{
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
});
