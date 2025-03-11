import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('user') 
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 200, description: 'If new user is successfully created, return "true"' })
  @Post('/sign-up')
  async SignUp(@Body() user: CreateUserDto) {
    return this.userService.SignUp(user);
  }

  @ApiOperation({ summary: 'Sign-in existing user' })
  @ApiResponse({ status: 200, description: 'Access Token' })
  @Post('/sign-in')
  async SignIn(@Body() user: SignInDto) {
    return this.userService.SignIn(user);
  }
}
