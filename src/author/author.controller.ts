import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.entity';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Author,
  },
  query: {
    join: {
      articles: {
        eager: true,
      },
    },
  },
})
@ApiTags('authors')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) { }
}
