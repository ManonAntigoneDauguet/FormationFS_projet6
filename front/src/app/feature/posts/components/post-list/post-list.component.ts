import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post.interface';
import { map, Observable, Subscription } from 'rxjs';

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
    this.postService.loadInitialData();
    this.posts$ = this.postService.getAll();
  }

  public filterPosts() {
    this.filterByDecrease = !this.filterByDecrease;
    if (this.filterByDecrease) {
          this.posts$ = this.postService.getAll().pipe(
      map(posts => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    );
    } else {
      this.posts$ = this.postService.getAll().pipe(
        map(posts => posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
      );
    }
  }
}
