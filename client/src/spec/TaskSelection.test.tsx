import React from "react"; 
import { render, screen } from "@testing-library/react"; 
import TaskSelection from "../component/Interface/component/TaskSelection/TaskSelection"; 
import { MediatorContext, ServerContext } from "../App"; 
import { Mediator, Server } from "../modules"; 
import { HOST, MEDIATOR } from "../config"; 
 
jest.useFakeTimers(); 
const mediator = new Mediator(MEDIATOR); 
const server = new Server(HOST, mediator); 
describe("TaskSelection Component", () => { 
    const mockSetQuestionFlag = jest.fn(); 
    const mockQuestions = [ 
        { 
            question: "Вопрос 1", 
            answer_1: "Ответ 1", 
            answer_2: "Ответ 2", 
            answer_3: "Ответ 3", 
            answer_4: "Ответ 4", 
            correct_answer: 2, 
        }, 
    ]; 
 
 
    it("renders correctly with default props", () => { 
        render( 
            <MediatorContext.Provider value={mediator}> 
                <ServerContext.Provider value={server}> 
                    <TaskSelection setQuestionFlag={mockSetQuestionFlag} /> 
                </ServerContext.Provider> 
            </MediatorContext.Provider> 
        ); 
 
        expect(screen.getByText("Вопрос 1")).toBeInTheDocument(); 
        expect(screen.getByText("Ответ 1")).toBeInTheDocument(); 
        expect(screen.getByText("Ответ 2")).toBeInTheDocument(); 
        expect(screen.getByText("Ответ 3")).toBeInTheDocument(); 
        expect(screen.getByText("Ответ 4")).toBeInTheDocument(); 
    }); 
 
    it("updates timer correctly", () => { 
        render( 
            <MediatorContext.Provider value={mediator}> 
                <ServerContext.Provider value={server}> 
                    <TaskSelection setQuestionFlag={mockSetQuestionFlag} /> 
                </ServerContext.Provider> 
            </MediatorContext.Provider> 
        ); 
 
        expect(screen.getByText("15")).toBeInTheDocument(); 
 
        jest.advanceTimersByTime(1000);  
        expect(screen.getByText("14")).toBeInTheDocument(); 
    }); 
 
}); 
 
jest.useRealTimers();