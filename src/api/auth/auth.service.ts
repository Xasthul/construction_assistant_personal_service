import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signUp (createUserDto: CreateUserDto) {
        const doesUserAlreadyExists = await this.usersRepository.existsBy({ email: createUserDto.email });
        if (doesUserAlreadyExists) {
            throw new ConflictException();
        }
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;

        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(createUserDto.password, salt);
        await this.usersRepository.insert(user);
    }

    async login (loginDto: LoginDto): Promise<string> {
        const user = await this.usersRepository.findOneBy({ email: loginDto.email });
        if (!user) {
            throw new UnauthorizedException();
        }

        const passwordsMatched = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordsMatched) {
            throw new UnauthorizedException();
        }

        const payload: JwtPayload = { id: user.id };
        return this.jwtService.sign(payload);
    }
}
