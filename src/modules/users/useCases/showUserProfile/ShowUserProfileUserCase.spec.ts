import { rejects } from "assert";
import { v4 as uuid } from "uuid";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

describe("Show User Profile", () => {

    let showUserProfileUseCase: ShowUserProfileUseCase;
    let inMemoryUsersRepository: IUsersRepository;

    beforeEach(() =>{
        inMemoryUsersRepository = new InMemoryUsersRepository();
        showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
    })

    it("Should be able to show user profile", async () => {
        const user = await inMemoryUsersRepository.create({
            name: "Anderson",
            email: "andersonvieira@test.com",
            password: "123"
        });

        const returnUser = await showUserProfileUseCase.execute(user.id!);

        expect(returnUser).toBe(user);
    })

    it("Should not be able to show user profile that does not exist", async () => {
        expect( async ()=>{
            await showUserProfileUseCase.execute(uuid());
        }).rejects.toBeInstanceOf(ShowUserProfileError)
    })
})