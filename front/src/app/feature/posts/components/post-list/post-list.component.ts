import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { SessionUserService } from 'src/app/core/services/sessionUser/session-user.service';
import { AuthService } from 'src/app/feature/auth/services/auth/auth.service';
import { User } from 'src/app/feature/profile/interfaces/user.interface';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public posts$!: Observable<Post[]>;
  public filterByDecrease = true;
  public user!: User;

  constructor(
    private postService: PostsService,
    private authService: AuthService,
    private sessionUserService: SessionUserService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  public filterPosts() {
    this.filterByDecrease = !this.filterByDecrease;
    if (this.filterByDecrease) {
      this.posts$ = this.postService.getAllPostsForUser(this.user.subscriptions).pipe(
        map(posts => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      );
    } else {
      this.posts$ = this.postService.getAllPostsForUser(this.user.subscriptions).pipe(
        map(posts => posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
      );
    }
  }

  private fetchData(): void {
    this.sessionUserService.getUser$().pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          this.user = user;
          return this.postService.getAllPostsForUser(user.subscriptions);

        } else {
          return this.authService.getProfile().pipe(
            tap((fetchedUser) => {
              this.user = fetchedUser;
              this.sessionUserService.updateUser(fetchedUser);
            }),
            switchMap((fetchedUser) => this.postService.getAllPostsForUser(fetchedUser.subscriptions)
            )
          )
        }
      })
    ).subscribe({
      next: (posts) => {
        this.posts$ = of(posts);
      },
      error: (error) => console.error(error)
    });
  }
}
