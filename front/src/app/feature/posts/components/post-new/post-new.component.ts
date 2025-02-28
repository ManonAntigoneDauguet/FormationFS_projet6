import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Topic } from 'src/app/feature/topics/interfaces/topic.interface';
import { TopicsService } from 'src/app/feature/topics/services/topics.service';
import { PostRequest } from '../../interfaces/postRequest.interface';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {

  public isError = false;
  public errorMessage = "error système";
  public topics: Topic[] = [];
  private subscription!: Subscription;

  public form = this.formBuilder.group({
    postTopic: [
      '',
      [
        Validators.required,
      ]
    ],
    postTitle: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]
    ],
    postContent: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService,
    private topicService: TopicsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onSubmit() {
    if (this.form.valid) {
      this.isError = false;

      const newPost: PostRequest = {
        title: this.form.value.postTitle!,
        content: this.form.value.postContent!,
        topicId: Number(this.form.value.postTopic!)
      }
      this.postService.savePost(newPost).subscribe();
      this.router.navigate(['/posts']);
    } else {
      this.isError = true;
      this.errorMessage = "Formulaire invalide ❌";
    }
  }

  private fetchData() {
    this.topicService.getAll([]).subscribe(topics => {
      this.topics = topics;
    })
  }
}
