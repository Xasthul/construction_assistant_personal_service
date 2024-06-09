import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/models/user.entity';
import { Repository } from 'typeorm';
import { LoginTokens } from 'src/domain/types/login_tokens';
import { generatePasswordHash, comparPasswordWithHash } from 'src/domain/utils/password';
import { EmailAlreadyRegisteredError, InvalidRefreshTokenError, WrongCredentialsError } from './types/auth-errors';
import { UserNotFoundError } from '../users/types/user-errors';

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
            throw new EmailAlreadyRegisteredError();
        }
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = await generatePasswordHash(createUserDto.password);
        await this.usersRepository.insert(user);
    }

    async login (loginDto: LoginDto): Promise<LoginTokens> {
        const user = await this.usersRepository.findOneBy({ email: loginDto.email });
        if (!user) {
            throw new WrongCredentialsError();
        }

        const passwordsMatched = await comparPasswordWithHash(loginDto.password, user.password);
        if (!passwordsMatched) {
            throw new WrongCredentialsError();
        }

        const payload: JwtPayload = { id: user.id };
        const accessToken = this.generateAccessTokenFor(payload);
        const refreshToken = this.generateRefreshTokenFor(payload);

        // TODO: refresh token should be hashed, but bcrypt can't do it
        await this.usersRepository.update(user.id, { refreshToken: refreshToken });

        const loginTokens: LoginTokens = { accessToken, refreshToken };
        return loginTokens;
    }

    async refreshToken (refreshToken: string): Promise<string> {
        const receivedPayload: JwtPayload = await this.jwtService.decode(refreshToken);
        const user = await this.usersRepository.findOneBy({ id: receivedPayload.id });
        if (!user) {
            throw new UserNotFoundError();
        }
        if (refreshToken !== user.refreshToken) {
            console.log('Invalid refresh token');
            throw new InvalidRefreshTokenError();
        }
        const newPayload: JwtPayload = { id: user.id };
        return this.generateAccessTokenFor(newPayload);
    }

    private generateAccessTokenFor (payload: JwtPayload): string {
        return this.jwtService.sign(payload, { expiresIn: '1m' });
    }

    private generateRefreshTokenFor (payload: JwtPayload): string {
        return this.jwtService.sign(payload, { expiresIn: '90d' });
    }
}
