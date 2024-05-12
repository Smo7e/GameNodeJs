import { render, screen } from "@testing-library/react";  
import Chat from "../component/Interface/component/Chat/Chat";  
import { MediatorContext, ServerContext } from "../App"; 
import { Mediator, Server } from "../modules"; 
import { HOST, MEDIATOR } from "../config"; 
 
const mediator = new Mediator(MEDIATOR); 
const server = new Server(HOST, mediator); 
test("Chat snapshot", () => { 
 
 
    const { asFragment } = render( 
        <MediatorContext.Provider value={mediator}> 
            <ServerContext.Provider value={server}> 
                <Chat /> 
            </ServerContext.Provider> 
        </MediatorContext.Provider> 
    ); 
 
    expect(asFragment()).toMatchSnapshot(); 
});