// получает объект
// объект должен содержать поля email и password
// если входные данные не соответствуют - прокидываем ошибку

// вариант - результат:
// {email, password} - status===200

// правильная работа. варианты

// ошибки: возможные варианты вводимых данных:

// ошибочный ввод данных. проброс ошибок. варианты
// () - error "data must be exist"   undefined
// ("") - error "must be object"
// false - error "must be object"
// true - error "must be object"
// null - error "must be object"
// ()=>{} - error "must be object"
// Number - error "must be object"
// [] - error "must be object"
//

// соединяется с базой данных в mongo-db
const mongoose = require("mongoose");
// имитирует запросы
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_TEST_HOST, PORT } = process.env;

describe("test login function", ()=> {
    let server;
    // запускает сервер 
    beforeAll(() => server = app.listen(PORT));
    // закрывает сервер 
    afterAll(()=> server.close());
    // коннектится к базе данных 
    beforeEach((done)=> {
        mongoose.connect(DB_TEST_HOST).then(()=> done())
    })
    // удаляет коллекцию 
    afterEach((done)=> {
        mongoose.connection.db.dropCollection(()=> {
            mongoose.connection.close(()=> done())
        })
    })
    // тест при вводе валидных данных
    test("test login function", async()=> {
        const newUser = {
            email: "Maksim@gmail.com",
            password: "Maksim123456"
        };
        // создает нового пользователя согласно модели
        const user = await User.create(newUser);

        /*
        1. Проверить правильность получаемого ответа на 
        AJAX-запрос документации
        2. Проверить что в базу записался нужный элемент.
        */

        const loginUser = {
            email: "Maksim@gmail.com",
            password: "Maksim123456"
        };
        // получает ответ, имитируя запрос с помощью request from supertest
        const response = await request(app).post("/api/users/login").send(loginUser);
        // проверяет равен ли статус-код 200
        expect(response.statusCode).toBe(200);
        const { body } = response;
        // проверяет наличие токена у данного пользователя
        expect(body.token).toBeTruthy();
        // получает токен из базы данных
        const { token } = await User.findById(user._id);
        // сравнивает эти два токена
        expect(body.token).toBe(token);
        
    })
})



// const login = require('./login');

// describe("test login.js controller", () => {
//     // правильная работа
//     test('вводимые данные - ожидаемый результат', () => { 
//         const result = login("вводимые данные");
//         expect(result).toBe(true) 
//     })
//     //аналогично. убрали промежуточную переменную result
//     test('вводимые данные - ожидаемый результат', () => { 
//         expect(login("вводимые данные")).toBe(true) 
//     })
    
//     // ошибочная работа
//     test('вводимые данные - текст ошибки', () => { 
//         expect(()=> login("вводимые данные")).toThrow("текст ошибки") 
//     })
// });




