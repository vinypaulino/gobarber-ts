import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject(UsersRepository)
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUserExiste = await this.usersRepository.findByEmail(email);

        if (checkUserExiste) {
            throw new AppError('Email address already used.');
        }

        const hashedPassoword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassoword,
        });

        return user;
    }
}

export default CreateUserService;
