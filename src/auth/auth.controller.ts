import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

//yarn add @nestjs/jwt @nestjs/passport passport passport-jwt //passport and jwt
//yarn add @types/pássport-jwt

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(AuthCredentialsDto);
  }
  @Post('/signIn')
  signIn(
    @Body() AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(AuthCredentialsDto);
  }
}
