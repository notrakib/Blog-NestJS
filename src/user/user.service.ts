import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, SignInDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private jwtService: JwtService
  ) { }

  async SignUp(
    createUserDto: CreateUserDto,
  ): Promise<{ created: boolean } | { error: string }> {
    try {
      const user: User = new User();

      const userExist = await this.users.findOneBy({ email: createUserDto.email });

      if (userExist) {
        throw new Error('Email already exists');
      }

      user.username = createUserDto.username;
      user.email = createUserDto.email;

      const hashPass = await bcrypt.hash(createUserDto.password, 10);

      user.password = hashPass;

      await this.users.save(user)

      return { created: true };
    } catch (e) {
      return { error: e.message };
    }
  }

  async SignIn(user: SignInDto): Promise<{ access_token: string } | { error: string }> {
    try {
      const userExist = await this.users.findOneBy({ email: user.email });

      if (!userExist) {
        throw new Error('User doesnot exist');
      }

      const isMatched = await bcrypt.compare(user.password, userExist.password);
      if (!isMatched) {
        throw new Error('Wrong Credential!');
      }

      const payload = {
        id: userExist.id,
        username: userExist.username,
        email: userExist.email,
      };

      return {
        access_token: await this.jwtService.signAsync(payload, { secret: process.env.SECRET }),
      };
    }
    catch (e) {
      return { error: e.message };
    }
  }
}
