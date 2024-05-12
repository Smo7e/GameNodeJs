import React from 'react';
import { render } from '@testing-library/react';
import Message from '../component/Interface/component/Message/Message';

describe('Message Component', () => {
  it('renders correctly with message and name props', () => {
    const { asFragment } = render(<Message message="Hello world!" name="John Doe" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

