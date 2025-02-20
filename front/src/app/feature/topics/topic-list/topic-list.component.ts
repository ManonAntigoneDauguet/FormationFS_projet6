import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicsContainerComponent } from 'src/app/core/components/topics-container/topics-container.component';
import { Topic } from 'src/app/core/interfaces/topic.interface';
import { TopicsService } from '../services/topics.service';
import { CommonModule } from '@angular/common';

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

  public topics!: Topic[];

  constructor(
    private topicService: TopicsService
  ) { }

  ngOnInit(): void {
    this.topicService.getAll().subscribe(
      {
        next: (data) => this.topics = data,
        error: (e) => console.error(e)
      }
    );
  }

  public toSubscribe() {
    alert("Vous êtes abonné !");
  }
}
