import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateBlogDto {
    @ApiProperty()
    @IsString()
    @MaxLength(30, { message: 'Title must not exceed 30 characters.' })
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @MaxLength(500, { message: 'Title must not exceed 30 characters.' })
    @IsNotEmpty()
    description: string;
}

export class UpdateBlogDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsString()
    @MaxLength(30, { message: 'Title must not exceed 30 characters.' })
    title: string;

    @ApiProperty()
    @IsString()
    @MaxLength(500, { message: 'Title must not exceed 30 characters.' })
    description: string;
}