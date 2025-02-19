import { Author } from 'src/app/core/interfaces/author.interface';
import { Topic } from 'src/app/core/interfaces/topic.interface';

export interface Post {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    topic: Topic,
    author: Author
}