import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public toSubscribe() {
    alert("Vous êtes abonné !");
  }
}
