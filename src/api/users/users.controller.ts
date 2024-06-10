import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { ChangeUserNameDto } from './dto/change-user-name.dto';
import { UsersService } from './users.service';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { RefreshTokenItemResource } from './resources/refresh-token-item';
import { RefreshTokenResource } from './resources/refresh-token';
import { UserResource } from './resources/user';
import { UserItemResource } from './resources/user-item';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
export class UsersController {
    constructor(readonly usersService: UsersService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get user's data" })
    @ApiResponse({ status: HttpStatus.OK, type: UserItemResource })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    async findById (
        @RequestUser() user: JwtPayload,
    ) {
        const userData = await this.usersService.findById(user.id,);

        return UserItemResource.from(
            UserResource.from(userData)
        );
    }

    @Put('change-name')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Change user's name" })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    changeName (
        @Body() changeUserNameDto: ChangeUserNameDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.usersService.changeName(
            changeUserNameDto.newName,
            user.id,
        );
    }

    @Put('change-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Change user's password" })
    @ApiResponse({ status: HttpStatus.OK, type: RefreshTokenItemResource })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Wrong old password' })
    async changePassword (
        @Body() changeUserPasswordDto: ChangeUserPasswordDto,
        @RequestUser() user: JwtPayload,
    ) {
        const refreshToken = await this.usersService.changePassword(
            changeUserPasswordDto.oldPassword,
            changeUserPasswordDto.newPassword,
            user.id,
        );

        return RefreshTokenItemResource.from(
            RefreshTokenResource.from(refreshToken),
        );
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Invalidate user's refresh token" })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    logout (@RequestUser() user: JwtPayload,) {
        return this.usersService.logout(user.id);
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Delete user" })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    delete (@RequestUser() user: JwtPayload,) {
        return this.usersService.delete(user.id);
    }
}
