<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ git clone https://github.com/Bouabidi/nest-project.git
```
```bash
$ cd nest-project
```

```bash
$ npm install
```

## Running the app

```bash
# start Postgresql
```

```bash
# create the database
$ create a databse and update ormconfig.json with your configuration
```

```bash
# open a terminal and run the server
$ npm run start:dev
```
## Tutorial
#Create new Project
```bash
# create the project
$ nest new nest-project
```

#Create route
```bash
# route customize 
$ to create a new route we can update app.controller.ts
```
```javascript
@Get(':id')
getHello(@Param('name') name: string): string {
  return this.appService.getHello(id);
}
```
and then update app.service.ts
```javascript
getHello(name: string): string {
  return `Hello ${id}!`;
}
```
and open open http://localhost:3000/test
 we will get Hello test!

NestJs offers other decorators (Get, Post, Put, Delete, etc...)

#TypeORM 
```
we will use TypeORM to create entity for our API and use Postgresql to save our data.
npm add @nestjs/typeorm typeorm pg.
create configuration file: touch ormconfig.json
update app.module.ts and import TypeOrmModule
```
```javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
To test the connection just start postgresql and create the databse then start you server.

#Add Entities
generate two Modules 
nest g module author

nest g module article

add author.entity.ts et article.entity.ts 

#Database connection
generate two services.
nest g service author

nest g service article

update the ArticleModule and do the same with AuthorModule
```javascript
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
```
#generate controllers
nest g controller article

nest g controller author
then inject each service in the suitable controller.

#Add Crud Module
npm add @nestjsx/crud @nestjsx/crud-typeorm class-transformer class-validator

update each service and controller 
```javascript
// article.controller.ts
import { Controller } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { Crud } from '@nestjsx/crud';

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
@Controller('articles')
export class ArticleController {
  constructor(public service: ArticleService) {}
}

// article.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
  constructor(@InjectRepository(Article) article) {
    super(article);
  }
}
```
do the same with the AuthorController  and AuthorService 
Now you kann use your API.




