import { Body, Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResource } from './resources/login';
import { RefreshTokenParam } from './dto/refresh-token.param';
import { AccessTokenResource } from './resources/access-token';
import { LoginItemResource } from './resources/login-item';
import { AccessTokenItemResource } from './resources/access-token-item';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({ status: HttpStatus.CREATED })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User with such email already exists' })
    signUp (@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: HttpStatus.OK, type: LoginItemResource })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Wrong credentials' })
    async login (@Body() loginDto: LoginDto) {
        const loginTokens = await this.authService.login(loginDto);

        return LoginItemResource.from(
            LoginResource.from(loginTokens),
        );
    }

    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: HttpStatus.OK, type: AccessTokenItemResource })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Invalid refresh token" })
    async refreshToken (@Query() refreshTokenParam: RefreshTokenParam) {
        const accessToken = await this.authService.refreshToken(refreshTokenParam.refreshToken);

        return AccessTokenItemResource.from(
            AccessTokenResource.from(accessToken),
        );
    }
}
