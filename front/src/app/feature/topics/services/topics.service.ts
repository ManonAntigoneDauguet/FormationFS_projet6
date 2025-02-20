import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, forkJoin, map, Observable, ReplaySubject, tap } from 'rxjs';
import { TopicApiResponse } from 'src/app/core/interfaces/topic-api-response.interface';
import { TopicSubscription } from 'src/app/core/interfaces/topic-subscription.interface';
import { Topic } from 'src/app/core/interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private pathService = 'api/topic';

  private topicsSubject = new ReplaySubject<Topic[]>(1)

  constructor(private http: HttpClient) { }

  private isSubscriber(topicId: number, listTopicsId: TopicSubscription[]): boolean {
    let isSubscriber = false;
    for (let topicsubscriber of listTopicsId) {
      if (topicsubscriber.id == topicId) {
        isSubscriber = true;
        break;
      }
    }
    return isSubscriber;
  }

  private loadAll(listTopicsId: TopicSubscription[]): void {
    this.http.get<TopicApiResponse[]>(`${this.pathService}`, { withCredentials: true })
      .pipe(
        map(topics => topics.map(
          data => ({
            id: data.id,
            name: data.name,
            content: data.content,
            subscriber: this.isSubscriber(data.id, listTopicsId)
          })
        )),
        tap((value) => this.topicsSubject.next(value)),
        catchError(() => {
          console.error("Erreur lors du chargement des posts");
          return EMPTY;
        })
      ).subscribe();;
  }

  public getAll(listTopicsId: TopicSubscription[]): Observable<Topic[]> {
    this.loadAll(listTopicsId);
    return this.topicsSubject.asObservable();
  }

  public getAllTopicsForUser(listTopicsId: TopicSubscription[]): Observable<Topic[]> {
    const topicObservables = listTopicsId.map(
      id => this.getTopic(id.id, true)
    )
    return forkJoin(topicObservables);
  }

  public getTopic(id: number, subscriber: boolean): Observable<Topic> {
    return this.http.get<TopicApiResponse>(`${this.pathService}/${id}`, { withCredentials: true })
      .pipe(
        map(
          data => ({
            id: data.id,
            name: data.name,
            content: data.content,
            subscriber: subscriber
          })
        ),
        catchError(() => {
          console.error("Erreur lors du chargement des posts");
          return EMPTY;
        })
      );
  }

  public toSubscribe(topicId: number): Observable<string> {
    return this.http.post(`${this.pathService}/${topicId}/subscribe`, {}, { responseType: 'text', withCredentials: true }) as Observable<string>;
  }

  public toUnsubscribe(topicId: number): Observable<string> {
    return this.http.delete(`${this.pathService}/${topicId}/subscribe`, { responseType: 'text', withCredentials: true }) as Observable<string>;
  }
}
