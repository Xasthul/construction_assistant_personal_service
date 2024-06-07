import { Body, Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResource } from './resources/login';
import { RefreshTokenParam } from './dto/refresh-token.param';
import { RefreshTokenResource } from './resources/refresh_token';

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
    @ApiResponse({ status: HttpStatus.OK, type: LoginResource })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Wrong credentials' })
    async login (@Body() loginDto: LoginDto) {
        const loginTokens = await this.authService.login(loginDto);

        return LoginResource.from(loginTokens);
    }

    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: HttpStatus.OK, type: LoginResource })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Invalid refresh token" })
    async refreshToken (@Query() refreshTokenParam: RefreshTokenParam) {
        const accessToken = await this.authService.refreshToken(refreshTokenParam.refreshToken);

        return RefreshTokenResource.from(accessToken);
    }
}
