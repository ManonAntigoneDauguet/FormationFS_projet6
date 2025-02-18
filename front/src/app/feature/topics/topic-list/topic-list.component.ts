import { Component, OnInit } from '@angular/core';
import { TopicsContainerComponent } from 'src/app/core/component/topics-container/topics-container.component';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
  imports: [
    TopicsContainerComponent
  ]
})
export class TopicListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public toSubscribe() {
    alert("Vous êtes abonné !");
  }
}
