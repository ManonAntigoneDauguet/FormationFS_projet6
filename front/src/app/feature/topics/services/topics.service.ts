import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';
import { TopicApiResponse } from 'src/app/core/interfaces/topic-api-response.interface';
import { TopicSubscription } from 'src/app/core/interfaces/topic-subscription.interface';
import { Topic } from 'src/app/core/interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private pathService = 'api/topic';

  private topicsSubject = new BehaviorSubject<Topic[]>([]);

  constructor(private http: HttpClient) { }

  private isSubscriber(topicId: number, listTopicsId: TopicSubscription[]): boolean {
    return listTopicsId.some(topicSub => topicSub.id === topicId);
  }

  private loadAll(listTopicsId: TopicSubscription[]): Observable<Topic[]> {
    return this.http.get<TopicApiResponse[]>(`${this.pathService}`, { withCredentials: true })
      .pipe(
        map(topics => topics.map(
          data => ({
            id: data.id,
            name: data.name,
            content: data.content,
            subscriber: this.isSubscriber(data.id, listTopicsId)
          })
        )),
        tap((data) => this.topicsSubject.next(data)),
        catchError(() => {
          console.error("Erreur lors du chargement des posts");
          return of([]);
        })
      );
  }

  public getAll(listTopicsId: TopicSubscription[]): Observable<Topic[]> {
    return this.loadAll(listTopicsId).pipe(
      switchMap(() => this.topicsSubject.asObservable())
    );
  }

  public getAllTopicsForUser(listTopicsId: TopicSubscription[]): Observable<Topic[]> {
    return this.getAll(listTopicsId).pipe(
      map(topics => topics.filter(
        topic => this.isSubscriber(topic.id, listTopicsId)
      ))
    );
  }

  public toSubscribe(topicId: number): Observable<string> {
    return this.http.post(`${this.pathService}/${topicId}/subscribe`, {}, { responseType: 'text', withCredentials: true })
      .pipe(
        tap(() => {
          const updatedTopics = this.topicsSubject.getValue()
            .map(
              topic => topic.id == topicId ? { ...topic, subscriber: true }
                : topic
            );
          this.topicsSubject.next(updatedTopics);
        })
      );
  }

  public toUnsubscribe(topicId: number): Observable<string> {
    return this.http.delete(`${this.pathService}/${topicId}/subscribe`, { responseType: 'text', withCredentials: true })
      .pipe(
        tap(() => {
          const updatedTopics = this.topicsSubject.getValue()
            .map(
              topic => topic.id == topicId ? { ...topic, subscriber: false }
                : topic
            );
          this.topicsSubject.next(updatedTopics);
        })
      );
  }
}
