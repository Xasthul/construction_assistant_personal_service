import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/models/user.entity';
import { Repository } from 'typeorm';
import { generateHashFor, comparStringWithHash } from 'src/domain/utils/hash';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/dto/jwt-payload';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async changeName (newName: string, userId: string): Promise<void> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.usersRepository.update(userId, { name: newName });
    }

    async changePassword (
        oldPassword: string,
        newPassword: string,
        userId: string,
    ): Promise<string> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isOldPasswordValid = await comparStringWithHash(oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new UnauthorizedException();
        }
        const newPasswordhash = await generateHashFor(newPassword);

        const payload: JwtPayload = { id: user.id };
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '90d' });
        const refreshTokenHash = await generateHashFor(refreshToken);

        await this.usersRepository.update(userId, {
            password: newPasswordhash,
            refreshToken: refreshTokenHash,
        });

        return refreshToken;
    }
}
