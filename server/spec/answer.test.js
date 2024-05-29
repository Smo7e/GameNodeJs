const Answer = require("../application/router/Answer");
const answer = new Answer();

describe("Проверка ответов", () => {
    test("Проверка правельного ответа", () => {
        const result = answer.good();
        expect(result).toEqual({ result: "ok", data: "ok" });
    });

    test("Проверка ложного ответа", () => {
        const result = answer.bad(9000);
        console.log(result);
        expect(result).toEqual({
            result: "error",
            error: { code: 9000, text: "Неопределенная ошибка" },
        });
    });
});
