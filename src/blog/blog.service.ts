import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogs: Repository<Blog>,
  ) { }

  async createBlog(user_id: number, createBlogDto: CreateBlogDto) {
    try {
      const blog: Blog = new Blog()
      blog.title = createBlogDto.title;
      blog.description = createBlogDto.description;
      blog.time = new Date()
      blog.user_id = user_id

      return await this.blogs.save(blog)
    }
    catch (e) {
      return { error: e.message }
    }
  }

  async updateBlog(id: number, user_id: number, updateBlogDto: UpdateBlogDto) {
    try {
      const blogExists = await this.blogs.findOneBy({ id, user_id })

      if (!blogExists) {
        throw new Error("Blog is no longer available")
      }

      blogExists.title = updateBlogDto.title ? updateBlogDto.title : blogExists.title;
      blogExists.description = updateBlogDto.description ? updateBlogDto.description : blogExists.description;

      return await this.blogs.save(blogExists)
    }
    catch (e) {
      return { error: e.message }
    }
  }

  async getAllBlog() {
    try {
      return await this.blogs.find()
    }
    catch (e) {
      return { error: e.message }
    }
  }

  async deleteBlog(user_id: number, id: number) {
    try {
      const blogExists = await this.blogs.findOneBy({ id, user_id })

      if (!blogExists) {
        throw new Error("Blog is no longer available")
      }

      return await this.blogs.delete(blogExists)
    }
    catch (e) {
      return { error: e.message }
    }
  }

  async getBlog(id: number) {
    try {
      const blogExists = await this.blogs.findOneBy({ id })

      if (!blogExists) {
        throw new Error("Blog is no longer available")
      }

      return blogExists
    }
    catch (e) {
      return { error: e.message }
    }
  }
}
