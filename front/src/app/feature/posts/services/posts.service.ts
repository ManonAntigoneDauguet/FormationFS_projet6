import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, ReplaySubject } from 'rxjs';
import { TopicSubscription } from 'src/app/core/interfaces/topic-subscription.interface';
import { PostComment } from '../interfaces/comment.interface';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private pathService = 'api/post';

  private postsSubject = new ReplaySubject<Post[]>(1)

  constructor(private http: HttpClient) { }

  public loadInitialData(): void {
    this.http.get<Post[]>(`${this.pathService}`, { withCredentials: true })
      .pipe(
        catchError(() => {
          console.error("Erreur lors du chargement des posts");
          return EMPTY;
        })
      )
      .subscribe(posts => {
        const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.postsSubject.next(sortedPosts)
      }
      );
  }

  public getAllPostsForUser(listTopicsId: TopicSubscription[]): Observable<Post[]> {
    this.loadInitialData();
    return this.postsSubject.asObservable();
  }

  public getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.pathService}/${id}`, { withCredentials: true })
      .pipe(
        catchError(() => {
          console.error("Erreur lors du chargement du post");
          return EMPTY;
        })
      );
  }

  public getAllCommentsForPost(id: string): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.pathService}/${id}/comment`, { withCredentials: true })
      .pipe(
        catchError(() => {
          console.error("Erreur lors du chargement du post");
          return EMPTY;
        })
      );
  }

    public saveComment(id: string, newComment: {content: string}): Observable<string> {
      return this.http.post(`${this.pathService}/${id}/comment`, newComment, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text',
        withCredentials: true
      });
    }

}
