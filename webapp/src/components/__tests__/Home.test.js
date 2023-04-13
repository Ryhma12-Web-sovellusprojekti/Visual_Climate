import React from 'react';
import Home from '../../pages/Home';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(() => {
    cleanup();
});

test('Matches Visu1 snapshot', () =>{
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});
