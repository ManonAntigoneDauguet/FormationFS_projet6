import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, ReplaySubject } from 'rxjs';
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

  public getAllForUser(): Observable<Post[]> {
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

}
