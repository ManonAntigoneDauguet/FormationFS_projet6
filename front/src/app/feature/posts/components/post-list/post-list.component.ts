import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SessionUserService } from 'src/app/core/services/sessionUser/session-user.service';
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

  constructor(
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  public filterPosts() {
    this.filterByDecrease = !this.filterByDecrease;
    if (this.filterByDecrease) {
      this.posts$ = this.postService.getAllPostsForUser().pipe(
        map(posts => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      );
    } else {
      this.posts$ = this.postService.getAllPostsForUser().pipe(
        map(posts => posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
      );
    }
  }

  private fetchData(): void {
    this.posts$ = this.postService.getAllPostsForUser();
  }
}
