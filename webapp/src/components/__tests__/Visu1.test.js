import React from 'react';
import Visu1 from '../Visu1';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(() => {
    cleanup();
});

test('Matches Visu1 snapshot', () =>{
    const tree = renderer.create(<Visu1 />).toJSON();
    expect(tree).toMatchSnapshot();
});
