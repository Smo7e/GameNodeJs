import React, { useContext, useEffect, useRef, useState } from "react";
import { TError } from "../../modules";
import { EPAGES, ServerContext, MediatorContext } from "../../App";

import "./SignUp.css";
import logo from "./image/logo.png";
import ErrorMessage from "../../modules/ErrorMessage/ErrorMessage";
import md5 from "md5";

interface ISignProps {
    epages: Function;
}

const SignUp: React.FC<ISignProps> = ({ epages }) => {
    const mediator = useContext(MediatorContext);
    const server = useContext(ServerContext);

    const [error, setError] = useState<TError | null>(null);

    const loginRef = useRef<HTMLInputElement>(null);
    const nickRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const verifyRef = useRef<HTMLInputElement>(null);

    const clickHandler = async () => {
        setError(null);
        const login = loginRef.current!.value;
        const nickname = nickRef.current!.value;
        const hash = md5(login + passwordRef.current!.value);
        const verifyHash = md5(login + verifyRef.current!.value);

        server.signUp(login, nickname, hash, verifyHash);
        // if (register) {
        //     epages(EPAGES.LOGIN);
        // }
    };

    useEffect(() => {
        const { SERVER_ERROR } = mediator.getEventTypes();

        const serverErrorHandler = (error: TError) => {
            setError(error);
        };

        mediator.subscribe(SERVER_ERROR, serverErrorHandler);

        server.socket.on("connect", () => {
            server.socket.on("SIGNUP", (data: any) => {
                console.log(data);
                if (data.result === "ok") {
                    epages(EPAGES.LOGIN);
                }
            });
        });

        return () => {
            mediator.unsubscribe(SERVER_ERROR, serverErrorHandler);
        };
    });

    return (
        <div className="container-SignUp" id="test-container-SignUp">
            <img className="logo-SignUp" src={logo} id="test-logo-SignUp" />
            <div className="text-SignUp" id="test-text-SignUp">
                СОЗДАТЬ УЧЕТНУЮ ЗАПИСЬ
            </div>
            <div className="form-SignUp">
                <div className="text-register" id="test-text-register">
                    Регистрация
                </div>
                <input ref={loginRef} className="input-SignUp" placeholder="Логин" id="test-input-login" />
                <input ref={nickRef} className="input-SignUp" placeholder="Никнейм" id="test-input-nick" />
                <input ref={passwordRef} className="input-SignUp" placeholder="Пароль" id="test-input-password" />
                <input
                    ref={verifyRef}
                    className="input-SignUp"
                    placeholder="Подтвердите пароль"
                    id="test-input-verify"
                />
                <button onClick={clickHandler} className="reg-button" id="test-reg-button">
                    Регистрация
                </button>
                <br />
                <br />
                <br />
                <ErrorMessage error={error} />
                <hr className="hr-SingUp" id="test-hr-SingUp" />
                <div className="estakk" id="test-estakk" onClick={() => epages(EPAGES.LOGIN)}>
                    Уже есть аккаунт
                </div>
            </div>
        </div>
    );
};
export default SignUp;
