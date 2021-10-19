import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

describe("Authenticate User", () => {

    let usersRepository: IUsersRepository;
    let createUserUseCase: CreateUserUseCase;
    let authenticateUserUseCase: AuthenticateUserUseCase;


    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
        createUserUseCase = new CreateUserUseCase(usersRepository);
    })

    it("Should be able to authenticate user", async () => {

        const password = '1234'

        const user = await createUserUseCase.execute({
            email: "anderson.vieira@test.com",
            password,
            name: "Anderson"
        })

        const auth = await authenticateUserUseCase.execute({
            email: user.email,
            password
        })

        expect(auth).toHaveProperty("token");
    })

    it("Should not be able to authenticate user that does not exists", async () => {

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "anderson.vieira@test.com",
                password: "12344",
            })

        }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
    })

    it("Should not be able to authenticate user with password incorrect", async () => {

        expect(async () => {
            await createUserUseCase.execute({
                email: "anderson.vieira@test.com",
                password: "1111",
                name: "Anderson"
            })

            await authenticateUserUseCase.execute({
                email: "anderson.vieira@test.com",
                password: "12344",
            })

        }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
    })
})