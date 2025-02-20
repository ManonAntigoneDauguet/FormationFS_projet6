import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '../../interfaces/topic.interface';
import { CommonModule } from '@angular/common';

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

  constructor() { }

  ngOnInit(): void {
    console.log(this.topics);
  }

  public toSubscribe() {
    console.log("Vous êtes abonné !");
  }
}
