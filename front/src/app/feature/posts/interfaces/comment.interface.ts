import { Author } from 'src/app/core/interfaces/author.interface';

export interface PostComment {
    id: number,
    content: string,
    createdAt: string,
    author: Author
}