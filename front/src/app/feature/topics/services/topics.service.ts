import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, forkJoin, Observable, ReplaySubject } from 'rxjs';
import { TopicSubscription } from 'src/app/core/interfaces/topic-subscription.interface';
import { Topic } from 'src/app/core/interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private pathService = 'api/topic';

  private topicsSubject = new ReplaySubject<Topic[]>(1)

  constructor(private http: HttpClient) { }

  private loadAll(): void {
    this.http.get<Topic[]>(`${this.pathService}`, { withCredentials: true })
      .pipe(
        catchError(() => {
          console.error("Erreur lors du chargement des posts");
          return EMPTY;
        })
      )
      .subscribe(topics => {
        this.topicsSubject.next(topics)
      }
      );
  }

  public getAll(): Observable<Topic[]> {
    this.loadAll();
    return this.topicsSubject.asObservable();
  }

  public getAllTopicsForUser(listTopicsId: TopicSubscription[]): Observable<Topic[]> {
    const topicObservables = listTopicsId.map(
      id => this.getTopic(id.id)
    )
    return forkJoin(topicObservables);
  }

  public getTopic(id: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.pathService}/${id}`, { withCredentials: true });
  }
}
