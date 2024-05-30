const Mediator = require("../application/modules/mediator/Mediator");
const CONFIG = require("../config");
const { MEDIATOR } = CONFIG;

const mediator = new Mediator(MEDIATOR);

describe("Проверка mediator", () => {
    const testFunc = () => {
        return;
    };

    test("Проверка подписки событий", async () => {
        const { TEST } = mediator.getEventTypes();

        mediator.subscribe(TEST, testFunc);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;

        expect(mediator.events[TEST]).toEqual([testFunc]);
    });

    test("Проверка отписки от события", async () => {
        const { TEST } = mediator.getEventTypes();

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const resultTest = await waitTime;

        mediator.unsubscribe(TEST, testFunc);

        expect(mediator.events[TEST]).toEqual([]);
    });

    test("Проверка вызова события", async () => {
        const { TEST } = mediator.getEventTypes();
        let result = null;

        const CallTestFunc = (data) => {
            result = data;
        };
        mediator.subscribe(TEST, CallTestFunc);
        mediator.call(TEST, "testStr");
        expect(result).toEqual("testStr");
    });
});
