import React from 'react';
import { render } from '@testing-library/react';
import Shop from '../component/Lobby/component/Shop'; 

jest.mock('../component/Lobby/panel/Panel.tsx', () => () => <div data-testid="mock-panel" />); // Мокируем Panel

describe('Shop Component', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Shop />);
    expect(asFragment()).toMatchSnapshot();
  });
});
