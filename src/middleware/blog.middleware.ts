import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const bearerHeader = req.header("authorization");

            if (!bearerHeader) {
                throw new Error("Please Sign in again.");
            }

            const verified = await this.jwtService.verifyAsync(
                bearerHeader,
                { secret: process.env.SECRET }
            );

            if (verified) {
                const user_isExist = await this.users.findOneBy({ id: verified.id })
                req["user"] = user_isExist;

                if (!user_isExist) {
                    throw new Error("You are not authorized to access this resource");
                }

            }

            next()
        }
        catch (e) {
            throw new UnauthorizedException(e.message);
        }

    }
}
