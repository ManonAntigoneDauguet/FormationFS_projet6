import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() subscriptionEvent = new EventEmitter<number>();
  @Output() unsubscriptionEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public toSubscribe(topicId: number) {
    this.subscriptionEvent.emit(topicId);
  }

  public toUnSubscribe(topicId: number) {
    this.unsubscriptionEvent.emit(topicId);
  }
}