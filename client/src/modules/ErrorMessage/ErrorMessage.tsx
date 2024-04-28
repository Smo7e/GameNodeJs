import React, { useState, useEffect, useContext } from "react";
import { TError } from "../Server/types";

import "./ErrorMessage.css";
import { MediatorContext } from "../../App";

const ErrorMessage: React.FC = () => {
    const mediator = useContext(MediatorContext);

    const [isVisible, setIsVisible] = useState(true);
    const [error, setError] = useState<TError | null>(null);

    useEffect(() => {
        const { SERVER_ERROR } = mediator.getEventTypes();
        const errorHandler = (data: any) => {
            setIsVisible(true);
            setError(data);
        };

        mediator.subscribe(SERVER_ERROR, errorHandler);
        if (error !== null) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 10000);

            return () => {
                mediator.unsubscribe(SERVER_ERROR, errorHandler);
                clearTimeout(timer);
            };
        }
    });

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleOk = () => {
        console.log("OK button clicked");
        setIsVisible(false);
    };
    if (error === null) {
        return <></>;
    }

    if (!isVisible) {
        return <></>;
    }

    return (
        <div className="error-container">
            <div className="error-header">
                <span className="error-title">Ошибка: {error?.code}</span>
                <button className="close-button" onClick={handleClose}></button>
            </div>
            <div className="error-body">
                <div className="error-text" id="test-error-text">
                    {error?.text}
                </div>
            </div>
            <div className="error-footer">
                <button className="ok-button" onClick={handleOk}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;
