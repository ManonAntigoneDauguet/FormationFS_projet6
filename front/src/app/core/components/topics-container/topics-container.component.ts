import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopicSubscription } from '../../interfaces/topic-subscription.interface';
import { Topic } from '../../interfaces/topic.interface';

@Component({
  selector: 'app-topics-container',
  standalone: true,
  templateUrl: './topics-container.component.html',
  styleUrls: ['./topics-container.component.scss'],
  imports: [
    CommonModule
  ]
})
export class TopicsContainerComponent implements OnInit {

  @Input() topics?: Topic[] | null;
  @Output() subscriptionEvent = new EventEmitter<TopicSubscription>();
  @Output() unsubscriptionEvent = new EventEmitter<TopicSubscription>();

  constructor() { }

  ngOnInit(): void {
  }

  public toSubscribe(topicId: number, topicName: string) {
    this.subscriptionEvent.emit({
      id: topicId,
      name: topicName
    });
  }

  public toUnSubscribe(topicId: number, topicName: string) {
    this.unsubscriptionEvent.emit({
      id: topicId,
      name: topicName
    });
  }
}