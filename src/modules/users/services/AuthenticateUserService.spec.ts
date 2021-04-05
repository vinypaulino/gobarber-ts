/* eslint-disable prettier/prettier */
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    });
    it('should be able to authenticate', async () => {
      

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'user@email.com',
            password: 'password',
        });

        const response = await authenticateUser.execute({
            email: 'user@email.com',
            password: 'password',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with invalid password', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'user@email.com',
            password: '123456',
        });

        await expect(authenticateUser.execute({
            email: 'user@email.com',
            password: 'invalid-password',
        })).rejects.toBeInstanceOf(AppError);

    });
});
