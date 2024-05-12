import React from 'react';
import { render } from '@testing-library/react';
import Game from '../modules/Game/Game';
import { MediatorContext, ServerContext } from '../App';
import { Mediator, Server } from "../modules"; 
import { HOST, MEDIATOR } from "../config"; 
 
const mediator = new Mediator(MEDIATOR); 
const server = new Server(HOST, mediator);

const mockMediator = {
  getEventTypes: jest.fn().mockReturnValue({ GET_GAMERS: 'GET_GAMERS' }),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  gamers: [{ name: 'TestUser1', x: 0, y: 0, hp: 1 }, { name: 'TestUser2', x: 1, y: 1, hp: 1 }],
  mobs: [{ x: 0, y: 0 }],
  triger: false,
  user: { name: 'TestUser1' },
};

const mockServer = {};

jest.mock('@react-three/fiber', () => ({
  ...jest.requireActual('@react-three/fiber'),
  Canvas: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  useFrame: jest.fn(),
  useThree: jest.fn(),
  useLoader: jest.fn().mockReturnValue({}),
}));

jest.mock('@react-three/rapier', () => ({
  ...jest.requireActual('@react-three/rapier'),
  Physics: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  RigidBody: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));

it('Game renders correctly', () => {
  const { asFragment } = render(
    <MediatorContext.Provider value={mediator}>
      <ServerContext.Provider value={server}>
        <Game />
      </ServerContext.Provider>
    </MediatorContext.Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
