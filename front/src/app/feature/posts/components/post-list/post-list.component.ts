import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts.service';
import { AuthService } from 'src/app/feature/auth/services/auth/auth.service';
import { User } from 'src/app/feature/profile/interfaces/user.interface';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (response: User) => {
        this.user = response;
      }
    })
    this.postService.loadInitialData();
    this.posts$ = this.postService.getAllForUser();
  }

  public filterPosts() {
    this.filterByDecrease = !this.filterByDecrease;
    if (this.filterByDecrease) {
      this.posts$ = this.postService.getAllForUser().pipe(
        map(posts => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      );
    } else {
      this.posts$ = this.postService.getAllForUser().pipe(
        map(posts => posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
      );
    }
  }
}
