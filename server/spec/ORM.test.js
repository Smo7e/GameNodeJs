const DB = require("../application/modules/db/DB");
const CONFIG = require("../config");

const { DATABASE } = CONFIG;
let db;
let orm;
(async () => {
    db = new DB(DATABASE);
    const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
    const result = await waitTime;
    orm = db.orm;
})();
let query;
describe("Проверка ORM", () => {
    test("Проверка метода get", async () => {
        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;

        let query = await orm.get("users", { id: 1 });
        expect(query).toEqual({
            id: 1,
            login: "vasya",
            password: "4a2d247d0c05a4f798b0b03839d94cf0",
            name: "Vasya Ivanoff",
            token: "25744fa1efb540a17c638458a3ca3949",
            friends: [2, 4, 5, 6, 7],
        });

        query = await orm.get("users", { id: 1 }, "login");
        expect(query).toEqual({ login: "vasya" });

        query = await orm.get("users", { id: 2 }, "id,login,name");
        expect(query).toEqual({
            id: 2,
            login: "petya",
            name: "Petya Petroff",
        });
    });
    test("Проверка метода all", async () => {
        query = await orm.all("users", { id: 1, login: "petya", name: "Masha" }, "name", true, "OR");
        expect(query).toEqual([{ name: "Masha" }, { name: "Petya Petroff" }, { name: "Vasya Ivanoff" }]);

        query = await orm.all("users", { id: 1 }, "*", true);
        expect(query).toEqual([
            {
                id: 1,
                login: "vasya",
                password: "4a2d247d0c05a4f798b0b03839d94cf0",
                name: "Vasya Ivanoff",
                token: "25744fa1efb540a17c638458a3ca3949",
                friends: [2, 4, 5, 6, 7],
            },
        ]);
        query = await orm.all("items");
        expect(query).toEqual([
            {
                id: 1,
                name: "Пиво",
                type: "Расходник",
                location: "Багетница",
                image: "https://drive.google.com/uc?id=1txKPVJl2qxHKfoTPNLb2Gof4Sb2_CJEp",
                description:
                    "Восстанавливает здоровье на 15 единиц, на время боя увеличивает максимальное здоровье на 20 единиц",
            },
            {
                id: 2,
                name: "Сосиска в тесте",
                type: "Расходник",
                location: "Багетница",
                image: "https://drive.google.com/uc?id=1_Oh0szf4vo2Uadnup78RSiPBVqOceEHD",
                description: "Восстанавливает здоровье на 15 единиц",
            },
            {
                id: 3,
                name: "Айфон",
                type: "Гаджет",
                location: "Программирование",
                image: "https://drive.google.com/uc?id=1_1JOzhHE-A07iss6PFHKy6vSVpugUL0q",
                description: "Увеличивает урон по “Программированию” на 15 единиц",
            },
            {
                id: 4,
                name: "Спортивки",
                type: "Одежда",
                location: "Физра",
                image: "https://drive.google.com/uc?id=1NVcwa-CUL0unvHG2Ai3dRB4unnqtxdK7",
                description: "Увеличивает постоянное здоровье на 15 единиц",
            },
            {
                id: 5,
                name: "Энергос",
                type: "Расходник",
                location: "Багетница",
                image: "https://drive.google.com/uc?id=1zOmnG7A1hi2swN4PRdhb5zP_phY0NOec",
                description:
                    "Восстанавливает здоровье на 15 единиц, на время боя увеличивает максимальное здоровье на 20 единиц",
            },
            {
                id: 6,
                name: "Учебник",
                type: "Расходник",
                location: "Программирование, русский язык, математика, английский язык",
                image: "https://drive.google.com/uc?id=1CcxSd3GCb92Krr4Of_iHkR82-iqm1PRV",
                description: "Увеличивает урон по всем парам кроме “Физра” на 5 единиц",
            },
            {
                id: 7,
                name: "Сигареты",
                type: "Расходник",
                location: "Багетница",
                image: "https://drive.google.com/uc?id=1w8Rg20Ee_N4WXohJtQ6wclGg3mXmjPzX",
                description: "Уменьшает текущее здоровье на 20, но на время боя увеличивает урон каждой атаки на 10",
            },
            {
                id: 8,
                name: "Кофта “Stone Island”",
                type: "Одежда",
                location: "Физра",
                image: "https://drive.google.com/uc?id=19xKs-LkbtI47TDBA22StocB-nvzkMaAv",
                description: "Увеличивает максимальное здоровье на 15",
            },
            {
                id: 9,
                name: "Калькулятор",
                type: "Гаджет",
                location: "Математика",
                image: "https://drive.google.com/uc?id=14HEzCbJRFXuc9p0AjPwlTK2pp3j43dCo",
                description: "Увеличивает урон по “Математике” на 15 единиц",
            },
            {
                id: 10,
                name: "Словарь",
                type: "Книга",
                location: "Русский язык, английский язык",
                image: "https://drive.google.com/uc?id=1Sms2iIUvf2aN3-EHdLz8-jMTyJLHhom0",
                description: "Увеличивает урон по “Русскому языку” и “Английскому языку” на 10 единиц",
            },
            {
                id: 11,
                name: "Ноутбук",
                type: "Гаджет",
                location: "Математика, программирование",
                image: "https://drive.google.com/uc?id=1AmXmAyEcvSGUK0gL70VDyx_nLIhT7GQI",
                description: "Увеличивает урон по “Программированию” и “Математике” на 10 единиц",
            },
            {
                id: 12,
                name: "Багет",
                type: "Расходник",
                location: "Багетница",
                image: "https://drive.google.com/uc?id=17LFVpq1h5V_HrYuHz6zbYpK3rcXpPBIY",
                description: "Восстанавливает здоровье на 25 единиц",
            },
        ]);
    });
    test("Проверка метода update", async () => {
        await orm.update("users", { name: "Vasya" }, { id: 1 });
        const query = await orm.get("users", { id: 1 }, "name");
        expect(query).toEqual({ name: "Vasya" });
        await orm.update("users", { name: "Vasya Ivanoff" }, { id: 1 });
    });

    test("Проверка метода update", async () => {
        await orm.update("users", { name: "Vasya" }, { id: 1 });
        const query = await orm.get("users", { id: 1 }, "name");
        expect(query).toEqual({ name: "Vasya" });
        await orm.update("users", { name: "Vasya Ivanoff" }, { id: 1 });
    });
});
