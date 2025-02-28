import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { TopicsContainerComponent } from 'src/app/core/components/topics-container/topics-container.component';
import { TopicSubscription } from 'src/app/core/interfaces/topic-subscription.interface';
import { Topic } from 'src/app/core/interfaces/topic.interface';
import { SessionUserService } from 'src/app/core/services/sessionUser/session-user.service';
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
  public topics$: Observable<Topic[]> = new Observable<Topic[]>();

  constructor(
    private topicService: TopicsService,
    private autService: AuthService,
    private sessionUserService: SessionUserService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  public toSubscribe(newSubscription: TopicSubscription) {
    this.topicService.toSubscribe(newSubscription.id).subscribe({
      next: () => {
        let newListSubscription: TopicSubscription[] = [...this.user.subscriptions, newSubscription];
        this.user = { ...this.user, subscriptions: newListSubscription };
        this.sessionUserService.updateUser(
          this.user
        );
      },

      error: (error) => {
        console.error(error)
        error.status === 400 ? alert("Vous êtes déjà abonné à ce thème")
          : alert("Erreur système");
      }
    });
  }

  public toUnsubscribe(newSubscription: TopicSubscription) {
    this.topicService.toUnsubscribe(newSubscription.id).subscribe({
      next: () => {
        const newListSubscription: TopicSubscription[] = this.user.subscriptions.filter(
          subscription => subscription.id != newSubscription.id
        )
        this.user = { ...this.user, subscriptions: newListSubscription };
        this.sessionUserService.updateUser(
          this.user
        );
      },

      error: (error) => {
        console.error(error)
        error.status === 400 ? alert("Vous n'êtes pas abonné à ce thème")
          : alert("Erreur système");
      }
    });
  }

  private fetchData() {
    this.sessionUserService.getUser$().pipe(
      take(1),
      switchMap((user) => {

        if (user) {
          this.user = user;
          return this.topicService.getAll(user.subscriptions);

        } else {
          return this.autService.getProfile().pipe(
            tap((fetchedUser) => {
              this.user = fetchedUser;
              this.sessionUserService.updateUser(fetchedUser);
            }),
            switchMap((fetchedUser) => this.topicService.getAll(fetchedUser.subscriptions))
          );
        }
      })
    ).subscribe({
      next: (topics) => this.topics$ = of(topics),
      error: (error) => console.error(error)
    });
  }
}
