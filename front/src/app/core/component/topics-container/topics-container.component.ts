import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics-container',
  standalone: true,
  templateUrl: './topics-container.component.html',
  styleUrls: ['./topics-container.component.scss']
})
export class TopicsContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public toSubscribe() {
    console.log("Vous êtes abonné !");
  }
}
