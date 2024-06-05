import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/models/user.entity';
import { Repository } from 'typeorm';
import { generatePasswordHash, comparePasswordWithHash } from 'src/domain/utils/password';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
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
    ): Promise<void> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isOldPasswordValid = await comparePasswordWithHash(oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new UnauthorizedException();
        }
        const newPasswordhash = await generatePasswordHash(newPassword);
        await this.usersRepository.update(userId, { password: newPasswordhash });
    }
}
