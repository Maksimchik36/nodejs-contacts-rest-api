// соединяется с базой данных в mongo-db
const mongoose = require("mongoose");
// имитирует запросы
const request = require("supertest");
// делает доступными в данном файле переменные окружения
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");
// создает аватар
const gravatar = require('gravatar');
// хэширует пароль
const bcrypt = require('bcrypt');

const { DB_TEST_HOST, PORT } = process.env;


describe("test login function", ()=> {
    let server;
    let dbConnection;

    // запускает сервер 
    beforeAll(() => { server = app.listen(PORT) });
    
    // закрывает сервер 
    afterAll(() => server.close());
    
    // коннектится к базе данных
    beforeEach(async()=> {
        dbConnection = await mongoose.connect(DB_TEST_HOST);
    })

    // удаляет коллекцию
    afterEach(async()=> {
        await mongoose.connection.dropCollection("users") 
        dbConnection.disconnect();
    })

    // тест при вводе валидных данных
    test("test login function", async () => {
        const avatarURL = gravatar.url();
        const newUser = {
            email: "Maksim@gmail.com",
            password: "Maksim123456",
            avatarURL
        };

        // хэширует пароль (второй параметр - 10 "крупинок соли" - дополнительные символы для шифрования)
        const hashPassword = await bcrypt.hash(newUser.password, 10);

        newUser.password = hashPassword;        

        // создает нового пользователя согласно модели
        const user = await User.create(newUser);

       // имитация ввода данных пользователем
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
        // сравнивает токен пользователя и токен из базы данных
        expect(body.token).toBe(token); 

    
        
        // expect(body.user).toHaveReturnedWith(
        //     expect.objectContaining({
        //         email: expect.any(String),
        //         subscription: expect.any(String),
        //     }),
        // );
    })
})