import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signUp(createUserDto: CreateUserDto) {
        const doesUserAlreadyExists = await this.usersService.exists(createUserDto.email);
        if (doesUserAlreadyExists) {
            throw new ConflictException();
        }

        await this.usersService.create(createUserDto);
    }

    async login(loginDto: LoginDto): Promise<string> {
        const user = await this.usersService.findOneByEmail(loginDto.email);

        const passwordsMatched = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordsMatched) {
            throw new UnauthorizedException();
        }

        const payload: JwtPayload = { id: user.id };
        return this.jwtService.sign(payload);
    }
}
