import { render, screen } from "@testing-library/react"; 
import Interface from "../component/Interface/Interface"; 
import { MediatorContext, ServerContext } from "../App"; 
import { Mediator, Server } from "../modules"; 
import { HOST, MEDIATOR } from "../config"; 
 
const mediator = new Mediator(MEDIATOR); 
const server = new Server(HOST, mediator); 
jest.useFakeTimers(); 
 
test("Interface snapshot", () => { 
 
  const { asFragment } = render( 
    <MediatorContext.Provider value={mediator}> 
      <ServerContext.Provider value={server}> 
        <Interface /> 
      </ServerContext.Provider> 
    </MediatorContext.Provider> 
  ); 

    expect(asFragment()).toMatchSnapshot(); 
 
  jest.advanceTimersByTime(1000);   
  expect(asFragment()).toMatchSnapshot(); 
 
  jest.useRealTimers(); 
});