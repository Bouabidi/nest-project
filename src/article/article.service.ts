import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article>{
    constructor(@InjectRepository(Article) article) {
        super(article);
    }
}
