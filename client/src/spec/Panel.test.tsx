import React from 'react';
import { render } from '@testing-library/react';
import Panel from '../component/Lobby/panel/Panel';


test('Panel snapshot', () => {
    const { asFragment } = render(<Panel />);
    expect(asFragment()).toMatchSnapshot();
  });
