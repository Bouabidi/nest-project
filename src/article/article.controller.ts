import { Controller, Get, Post, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model: {
        type: Article,
    },
    query: {
        join: {
            author: {
                eager: true,
            },
        },
    },
})
@ApiTags('articles')
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }
}
