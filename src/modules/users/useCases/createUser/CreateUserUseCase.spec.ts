import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User", () => {

    let usersRepository: IUsersRepository;
    let createUserUseCase: CreateUserUseCase;

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepository);
    })

    it("Should be able to create user", async () => {

        const user = await createUserUseCase.execute({
            name: "name",
            email: "email@teste.com",
            password: "password"
        });

        expect(user).toHaveProperty("id");
    })

    it("Should not be able to create user that already exists", async () => {
        expect(async () => {
            const user = {
                name: "Anderson",
                email: "anderson@teste.com",
                password: "12345"
            };
            await createUserUseCase.execute(user);
            await createUserUseCase.execute(user);

        }).rejects.toBeInstanceOf(CreateUserError);
    })
})