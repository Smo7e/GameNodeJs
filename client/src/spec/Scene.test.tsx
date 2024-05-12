import React from 'react';
import { render } from '@testing-library/react';
import Scene from '../modules/Game/Scene';

describe('Scene', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Scene />);
    expect(asFragment()).toMatchSnapshot();
  });
});
