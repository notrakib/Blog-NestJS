import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @ApiOperation({ summary: 'Create New Blog' })
  @ApiResponse({ status: 200, description: 'Return newly created blog.' })
  @Post()
  createBlog(@Req() req: Request, @Body() createBlogDto: CreateBlogDto) {
    const user_id = req["user"].id
    return this.blogService.createBlog(user_id, createBlogDto);
  }

  @ApiOperation({ summary: 'Update existing blog' })
  @ApiResponse({ status: 200, description: 'Return updated blog.' })
  @Patch(':id')
  updateBlog(@Req() req: Request, @Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    const user_id = req["user"].id
    return this.blogService.updateBlog(id, user_id, updateBlogDto);
  }

  @ApiOperation({ summary: 'Get all existing blog' })
  @ApiResponse({ status: 200, description: 'Can be accessed by anyone.' })
  @Get()
  findAllBlogs() {
    return this.blogService.getAllBlog();
  }

  @ApiOperation({ summary: 'Delete existing blog' })
  @ApiResponse({ status: 200, description: 'Can be deleted only by the author.' })
  @Delete(':id')
  findOne(@Req() req: Request, @Param('id') id: number) {
    const user_id = req["user"].id
    return this.blogService.deleteBlog(user_id, id);
  }

  @ApiOperation({ summary: 'Get single existing blog' })
  @ApiResponse({ status: 200, description: 'Can access anyone.' })
  @Get(':id')
  findBlog(@Param('id') id: number) {
    return this.blogService.getBlog(id);
  }
}
