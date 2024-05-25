import { useContext, useEffect, useState, useRef, memo } from "react";
import "./TaskSelection.css";
import { ServerContext, StoreContext } from "../../../../App";
import { VARIABLE } from "../../../../modules/Store/Store";
import { TUserFull } from "../../../../modules/Server/types";

const TaskSelection: React.FC = memo(() => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<HTMLDivElement>(null);
    const questionRef = useRef<HTMLDivElement>(null);
    const answer1Ref = useRef<HTMLDivElement>(null);
    const answer2Ref = useRef<HTMLDivElement>(null);
    const answer3Ref = useRef<HTMLDivElement>(null);
    const answer4Ref = useRef<HTMLDivElement>(null);

    const questions = store.get(VARIABLE.QUESTIONS);
    const question = questions[rndNumber(0, questions.length - 1)];

    const user: TUserFull = store.get(VARIABLE.USER);
    let timer = 15;
    let taskTimer = 5;
    let canAnswer: boolean = true;
    useEffect(() => {
        const timerId = setInterval(() => {
            if (timerRef.current) {
                timerRef.current.innerHTML = `${timer}`;
                if (timer === 0) {
                    stoppingResponses();
                    taskTimer -= 1;
                    if (taskTimer == 0) {
                        startingResponses();
                    }
                    return;
                }
                timer -= 1;
            }
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    });
    const stoppingResponses = () => {
        canAnswer = false;
        timer = 0;
        containerRef.current!.style.visibility = "hidden";
    };
    const startingResponses = () => {
        canAnswer = true;
        containerRef.current!.style.visibility = "visible";
        timer = 15;
        taskTimer = 5;
    };

    if (!question) return <></>;

    function rndNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    if (questionRef.current && answer1Ref.current && answer2Ref.current && answer3Ref.current && answer4Ref.current) {
        questionRef.current.innerHTML = question.question;
        answer1Ref.current.innerHTML = question.answer_1;
        answer2Ref.current.innerHTML = question.answer_2;
        answer3Ref.current.innerHTML = question.answer_3;
        answer4Ref.current.innerHTML = question.answer_4;
    }
    const checkAnswer = (answer: number) => {
        if (question && canAnswer) {
            stoppingResponses();
            if (answer === question.correct_answer) {
                server.updateHpMobs();
                //
                return;
            }
            //
            server.updateHp(user.name);
            return;
        }
    };
    return (
        <div ref={containerRef} className="taskselection-Container">
            <div className="taskselection-timer" ref={timerRef}></div>
            <div className="taskselection-question" ref={questionRef}>
                {question.question}
            </div>

            <div className="taskselection-answer">Ответы</div>

            <div className="taskselection-choice1" ref={answer1Ref} onClick={() => checkAnswer(1)}>
                {question.answer_1}
            </div>
            <div className="taskselection-choice2" ref={answer2Ref} onClick={() => checkAnswer(2)}>
                {question.answer_2}
            </div>
            <div className="taskselection-choice3" ref={answer3Ref} onClick={() => checkAnswer(3)}>
                {question.answer_3}
            </div>
            <div className="taskselection-choice4" ref={answer4Ref} onClick={() => checkAnswer(4)}>
                {question.answer_4}
            </div>
        </div>
    );
});
export default TaskSelection;
