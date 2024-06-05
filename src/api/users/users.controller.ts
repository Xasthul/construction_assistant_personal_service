import { Body, Controller, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { ChangeUserNameDto } from './dto/change-user-name.dto';
import { UsersService } from './users.service';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
export class UsersController {
    constructor(readonly usersService: UsersService) { }

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
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Wrong old password' })
    changePassword (
        @Body() changeUserPasswordDto: ChangeUserPasswordDto,
        @RequestUser() user: JwtPayload,
    ) {
        return this.usersService.changePassword(
            changeUserPasswordDto.oldPassword,
            changeUserPasswordDto.newPassword,
            user.id,
        );
    }
}
