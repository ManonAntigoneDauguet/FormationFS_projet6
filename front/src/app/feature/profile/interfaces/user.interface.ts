import { TopicSubscription } from 'src/app/core/interfaces/topic-subscription.interface';

export interface User {
    id: number,
    username: string,
    email: string,
    subscriptions: TopicSubscription
}