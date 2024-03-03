import React, { useRef } from "react";
import "./TaskText.css";

interface TaskTextProps {
  task?: string;
}

const TaskText: React.FC<TaskTextProps> = ({ task }) => {
  const taskRef = useRef<HTMLInputElement>(null);
  const taskValue = taskRef.current?.value;

  return (
    <div className="tasktext-Container">
      <div className="tasktext-timer">00 : 00</div>
      <div className="tasktext-question">Вопросы?</div>
      <input ref={taskRef} className="tasktext-input" placeholder="Ответить" />
      <div className="tasktext-answer">Ответ</div>
    </div>
  );
};

export default TaskText;
