import React from 'react';
import { render} from '@testing-library/react';
import ParametersGame from '../component/Interface/component/ParametersGame/ParametersGame';

test("ParametersGame snapshot", () => {
    const { asFragment } = render(
                <ParametersGame />
    );
    expect(asFragment()).toMatchSnapshot();
});