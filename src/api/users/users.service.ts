import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async create(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;

        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(createUserDto.password, salt);
        return await this.usersRepository.save(user);
    }

    async findOneByEmail(email: string) {
        const user = await this.usersRepository.findOneBy({ email: email });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async exists(email: string): Promise<boolean> {
        return await this.usersRepository.existsBy({ email: email });
    }
}
