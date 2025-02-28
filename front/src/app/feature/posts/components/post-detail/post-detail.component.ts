import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, of, switchMap, take } from 'rxjs';
import { SessionUserService } from 'src/app/core/services/sessionUser/session-user.service';
import { User } from 'src/app/feature/profile/interfaces/user.interface';
import { PostComment } from '../../interfaces/comment.interface';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  isError = false;
  errorMessage = "error système";
  public user!: User | null;
  public post$!: Observable<Post>;
  public comments$!: Observable<PostComment[]>;

  public form = this.formBuilder.group({
    commentContent: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sessionUserService: SessionUserService,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  public onSubmit() {
    if (this.form.valid) {
      this.isError = false;

      const newComment = {
        content: this.form.value.commentContent!
      };

      this.route.paramMap.pipe(
        take(1),
        switchMap(params => {
          const postId = params.get('id');
          if (!postId) return EMPTY;
          return this.postService.saveComment(postId, newComment).pipe(
            switchMap(() => {
              this.comments$ = this.postService.getAllCommentsForPost(postId);
              return this.postService.getPost(postId);
            })
          );
        })
      ).subscribe({
        next: (post) => {
          this.post$ = of(post);
          this.form.reset();
        },
        error: (error) => {
          console.error(error);
          this.isError = true;
          this.errorMessage = "Erreur système"
        }
      });

    } else {
      this.isError = true;
      this.errorMessage = "Formulaire invalide ❌";
    }
  }

  private fetchData(): void {
    this.sessionUserService.getUser$().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        const postId = params.get('id');
        if (postId) {
          this.comments$ = this.postService.getAllCommentsForPost(postId);
          return this.postService.getPost(postId!);
        }
        return EMPTY;
      })
    );
  }
}
