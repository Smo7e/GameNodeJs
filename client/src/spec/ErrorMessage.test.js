import React from 'react'; 
import { render } from '@testing-library/react'; 
import ErrorMessage from '../modules/ErrorMessage/ErrorMessage'; 
import { MediatorContext } from '../App'; 
import Mediator from '../modules/Mediator/Mediator'; 
import { HOST, MEDIATOR } from "../config";  
 
jest.useFakeTimers(); 
 
describe('ErrorMessage Component', () => { 
    const mediator = new Mediator(MEDIATOR);  
   
  it('renders correctly with null error', () => { 
    const { asFragment } = render( 
      <MediatorContext.Provider value={mediator}> 
        <ErrorMessage /> 
      </MediatorContext.Provider> 
    ); 
    expect(asFragment()).toMatchSnapshot(); 
  }); 
 
  it('renders correctly with error and is visible', () => { 
    const error = { code: 500, text: 'Internal Server Error' }; 
    mediator.call('SERVER_ERROR', error);  
     
    const { asFragment } = render( 
      <MediatorContext.Provider value={mediator}> 
        <ErrorMessage /> 
      </MediatorContext.Provider> 
    ); 
    expect(asFragment()).toMatchSnapshot(); 
  }); 
 
  it('hides after 10 seconds', () => { 
    const error = { code: 404, text: 'Not Found' }; 
    mediator.call('SERVER_ERROR', error);   
 
    const { asFragment } = render( 
      <MediatorContext.Provider value={mediator}> 
        <ErrorMessage /> 
      </MediatorContext.Provider> 
    ); 
 
    jest.advanceTimersByTime(10000); 
    expect(asFragment()).toMatchSnapshot();  
  }); 
});
