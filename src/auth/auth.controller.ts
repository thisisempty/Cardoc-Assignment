import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() authCredentialDto: AuthCredentialDto) {
        return this.authService.signUp(authCredentialDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<{access_token}> {
        return this.authService.signIn(signInDto)
    }
}
