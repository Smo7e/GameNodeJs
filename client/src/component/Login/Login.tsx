import React, { useContext, useEffect, useRef, useState } from "react";
import "./Login.css";
import { EPAGES, MediatorContext, ServerContext } from "../../App";
import md5 from "md5";
import ErrorMessage from "../../modules/ErrorMessage/ErrorMessage";
import { TError } from "../../modules";
interface ILoginProps {
    epages: Function;
}
const Login: React.FC<ILoginProps> = ({ epages }) => {
    const mediator = useContext(MediatorContext);
    const server = useContext(ServerContext);

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<TError | null>(null);

    const clickHandler = async () => {
        setError(null);
        const login = loginRef.current!.value;
        const password = passwordRef.current!.value;
        const rnd = Math.round(Math.random() * 1000000);
        const hash = md5(md5(login + password) + rnd);
        server.login(login, hash, rnd);
    };

    useEffect(() => {
        server.socket.on("connect", () => {
            server.socket.on("LOGIN", (data: any) => {
                if (data.result === "ok") {
                    mediator.user = data;
                    epages(EPAGES.MENU);
                }
            });
        });

        const { SERVER_ERROR } = mediator.getEventTypes();

        const serverErrorHandler = (error: TError) => {
            setError(error);
        };

        mediator.subscribe(SERVER_ERROR, serverErrorHandler);

        return () => {
            mediator.unsubscribe(SERVER_ERROR, serverErrorHandler);
        };
    });

    return (
        <div className="Login" id="test-login">
            <div className="logoLogin" id="test-logo"></div>
            <div className="containerLogin" id="test-container">
                <div className="containerLoginHeader" id="test-header">
                    Войти
                </div>
                <div>
                    <input ref={loginRef} className="loginInput" placeholder="Логин" id="test-login-input" />
                    <input
                        ref={passwordRef}
                        type="password"
                        className="loginInput"
                        placeholder="Пароль"
                        id="test-password-input"
                    />
                </div>

                <div className="checkboxLogin-container" id="test-checkbox-container">
                    <input type="checkbox" className="checkboxLogin" id="test-remember-checkbox" />
                    <div className="checkboxLoginText" id="test-text-checkbox">
                        Не выходить из учетной записи
                    </div>
                </div>

                <button className="loginButton" onClick={clickHandler} id="test-login-button">
                    Продолжить
                </button>
                <ErrorMessage error={error} />

                <hr className="hrLogin" id="test-hrLogin" />

                <div className="otherButtonsLogin" id="test-other-buttons">
                    <button className="otherButtonLogin" id="test-forgot-password-button">
                        Не можете войти?
                    </button>
                    <button
                        className="otherButtonLogin"
                        onClick={() => epages(EPAGES.SIGNUP)}
                        id="test-create-account-button"
                    >
                        Создать учетную запись
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
