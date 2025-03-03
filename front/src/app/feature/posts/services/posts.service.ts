import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { PostComment } from '../interfaces/comment.interface';
import { Post } from '../interfaces/post.interface';
import { PostRequest } from '../interfaces/postRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private pathService = 'api/post';

  private postsSubject = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * Loads all posts about topics that the user is subscriber and update the concerned subject
   */
  public loadInitialData(): void {
    this.http.get<Post[]>(`${this.pathService}/subscriber`, { withCredentials: true })
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

  /**
   * Gets all posts about topics that the user is subscriber
   * @returns {Observable<Post[]>}
   */
  public getAllPostsForUser(): Observable<Post[]> {
    this.loadInitialData();
    return this.postsSubject.asObservable();
  }

  /**
   * Get information of a specific post
   * @param {string} id as the id of the post
   * @returns {Observable<Post>}
   */
  public getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.pathService}/${id}`, { withCredentials: true })
      .pipe(
        catchError(() => {
          console.error("Erreur lors du chargement du post");
          return EMPTY;
        })
      );
  }

  /**
   * Send a new post
   * @param {PostRequest} newPost 
   * @returns {Observable<string>} as validation message
   */
  public savePost(newPost: PostRequest): Observable<string> {
    return this.http.post(`${this.pathService}`, newPost, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
      withCredentials: true
    }).pipe(
      tap(() => {
        this.loadInitialData();
      })
    );;
  }

  /**
   * Gets all comments about a specific post
   * @param {string} id as the id of the post
   * @returns {Observable<PostComment[]>}
   */
  public getAllCommentsForPost(id: string): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.pathService}/${id}/comment`, { withCredentials: true })
      .pipe(
        catchError(() => {
          console.error("Erreur lors du chargement du post");
          return EMPTY;
        })
      );
  }

  /**
   * Send a new comment
   * @param {string} id as the id of the commented post
   * @param { Object.<content: string> } newComment 
   * @returns {Observable<string>} as validation message
   */
  public saveComment(id: string, newComment: { content: string }): Observable<string> {
    return this.http.post(`${this.pathService}/${id}/comment`, newComment, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
      withCredentials: true
    });
  }

}
