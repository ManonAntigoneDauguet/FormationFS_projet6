import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TopicsContainerComponent } from 'src/app/core/components/topics-container/topics-container.component';
import { Topic } from 'src/app/core/interfaces/topic.interface';
import { AuthService } from '../../auth/services/auth/auth.service';
import { User } from '../../profile/interfaces/user.interface';
import { TopicsService } from '../services/topics.service';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
  imports: [
    CommonModule,
    TopicsContainerComponent
  ]
})
export class TopicListComponent implements OnInit {

  public user!: User;
  public topics!: Topic[];

  constructor(
    private topicService: TopicsService,
    private autService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  public toSubscribe(topicId: number) {
    this.topicService.toSubscribe(topicId).subscribe({
      next: () => {
        alert("Vous êtes abonné !");
        this.fetchData();
      },
      error: (error) => {
        console.error(error)
        if (error.status === 400) {
          alert("Vous êtes déjà abonné à ce thème");
        } else {
          alert("Erreur système")
        }
      }
    });
  }

  public toUnsubscribe(topicId: number) {
    this.topicService.toUnsubscribe(topicId).subscribe({
      next: () => {
        alert("Vous êtes désabonné !");
        this.fetchData();
      },
      error: (error) => {
        console.error(error)
        if (error.status === 400) {
          alert("Vous n'êtes pas abonné à ce thème");
        } else {
          alert("Erreur système")
        }
      }
    });
  }

  private fetchData() {
    this.autService.getProfile().subscribe({
      next: (response: User) => {
        this.user = response;
        this.fetchTopics();
      },
      error: (e) => console.error(e)
    })
  }

  private fetchTopics() {
    this.topicService.getAll(this.user.subscriptions).subscribe(
      {
        next: (data) => this.topics = data,
        error: (e) => console.error(e)
      }
    );
  }
}
