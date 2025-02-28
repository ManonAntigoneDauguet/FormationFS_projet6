import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { TopicApiResponse } from 'src/app/feature/topics/interfaces/topic-api-response.interface';
import { TopicSubscription } from 'src/app/core/interfaces/topic-subscription.interface';
import { Topic } from 'src/app/feature/topics/interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private pathService = 'api/topic';

  private topicsSubject = new BehaviorSubject<Topic[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * Returns true if the user is a subscriber of the topic
   * @param {number} topicId as the id of the topic
   * @param {TopicSubscription[]} listTopicsId 
   * @returns {boolean}
   */
  private isSubscriber(topicId: number, listTopicsId: TopicSubscription[]): boolean {
    return listTopicsId.some(topicSub => topicSub.id === topicId);
  }

  /**
   * Loads all topics, with the precision of if the user is a subscriber or not, and update the concerned subject
   * @param listTopicsId 
   * @returns 
   */
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

  /**
   * Gets all topics, with the precision of if the user is a subscriber or not
   * @param listTopicsId 
   * @returns {Observable<Topic[]>}
   */
  public getAll(listTopicsId: TopicSubscription[]): Observable<Topic[]> {
    return this.loadAll(listTopicsId).pipe(
      switchMap(() => this.topicsSubject.asObservable())
    );
  }

  /**
   * Gets only the topics that the user is a subscriber
   * @param {TopicSubscription[]} listTopicsId 
   * @returns {Observable<Topic[]>}
   */
  public getAllTopicsForUser(listTopicsId: TopicSubscription[]): Observable<Topic[]> {
    return this.getAll(listTopicsId).pipe(
      map(topics => topics.filter(
        topic => this.isSubscriber(topic.id, listTopicsId)
      ))
    );
  }

  /**
   * Subscribe to a topic
   * @param {number} topicId as the id of topic
   * @returns {Observable<string>} as validation message
   */
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

  /**
   * Unsubscribe to a topic
   * @param topicId as the id of topic
   * @returns {Observable<string>} as validation message
   */
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
