import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExiste = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExiste) {
            throw new AppError('Email address already used.');
        }

        const hashedPassoword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassoword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
