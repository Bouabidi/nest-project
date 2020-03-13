import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Author } from '../author/author.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @CreateDateColumn({name: 'publishedDate'})
    publishedDate: Date;

    @Column({
        default: 0,
    })
    likes: number;

    @ApiProperty({ type: () => Author })
    @ManyToOne(() => Author, author => author.articles)
    author: Author;
}