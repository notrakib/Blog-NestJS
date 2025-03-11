import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { BlogMiddleware } from './middleware/blog.middleware';
import { BlogController } from './blog/blog.controller';
import { User } from './user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.USERNAME)

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    UserModule,
  TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.HOST,
    port: +process.env.PORT,
    password: process.env.PASSWORD,
    username: process.env.USERNAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
  }),
    BlogModule,
  TypeOrmModule.forFeature([User]),
  ], providers: [JwtService],

})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BlogMiddleware)
      .exclude(
        { path: 'blog', method: RequestMethod.GET },
        { path: 'blog/:id', method: RequestMethod.GET },
      )
      .forRoutes(BlogController);
  }
}