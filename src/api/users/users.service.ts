import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/models/user.entity';
import { Repository } from 'typeorm';
import { generatePasswordHash, comparPasswordWithHash } from 'src/domain/utils/password';
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
        const isOldPasswordValid = await comparPasswordWithHash(oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new UnauthorizedException();
        }
        const newPasswordhash = await generatePasswordHash(newPassword);

        const payload: JwtPayload = { id: user.id };
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '90d' });

        await this.usersRepository.update(userId, {
            password: newPasswordhash,
            refreshToken: refreshToken,
        });

        return refreshToken;
    }

    async logout (userId: string): Promise<void> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.usersRepository.update(userId, { refreshToken: null, });
    }

    async delete (userId: string): Promise<void> {
        const result = await this.usersRepository.delete(userId);
        if (result.affected < 1) {
            throw new NotFoundException();
        }
    }
}
