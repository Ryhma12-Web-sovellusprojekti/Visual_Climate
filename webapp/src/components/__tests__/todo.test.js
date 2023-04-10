import {render, screen, cleanup} from '@testing-library/react';
import Footer from '../Footer';

test('Footer', () => {
    render(<Footer/>);
    const footerElement = screen.getByTestId('Footer1');
    expect(footerElement).toBeInTheDocument;
}); 

