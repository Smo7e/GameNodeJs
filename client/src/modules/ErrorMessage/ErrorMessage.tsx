import React from "react";
import { TError } from "../Server/types";

import "./ErrorMessage.css"

interface IErrorMessageProps {
  error: TError | null;
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({ error }) => {

    if (error === null) {
        return null;
      }

      return (
            <div className="error-message" id="test-error-message">
                <div className="error-code" id="test-error-code">Error Code: {error?.code}</div>
                <div className="error-text" id="test-error-text">{error?.text}</div>
            </div>
    );
};

export default ErrorMessage;