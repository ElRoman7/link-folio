import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { Auth, GetUser } from './decorators';
import { ValidRoles } from 'src/users/interfaces/valid-roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Auth(ValidRoles.user, ValidRoles.admin)
  @Get('check-status')
  async checkAuthStatus(@GetUser() user: User) {
    // Algo
    return await this.authService.refresh(user);
  }

  // ToDo: Request reset password and reset password method (Repo: auth-nestjs)
}
