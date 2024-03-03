import React, { useEffect, useState } from "react";
const useControls = () => {
    const [controls, setControls] = useState({
        w: false,
        s: false,
        a: false,
        d: false,
    });

    const keydownHangler = (e: any) => {
        const key = e.code[e.code.length - 1].toLowerCase();
        setControls((controls) => ({
            ...controls,
            [key]: true,
        }));
    };
    const keyUpHangler = (e: any) => {
        const key = e.code[e.code.length - 1].toLowerCase();
        setControls((controls) => ({
            ...controls,
            [key]: false,
        }));
    };
    useEffect(() => {
        window.addEventListener("keydown", keydownHangler);
        window.addEventListener("keyup", keyUpHangler);
        return () => {
            window.removeEventListener("keydown", keydownHangler);
            window.removeEventListener("keyup", keyUpHangler);
        };
    });
    return controls;
};
export default useControls;
