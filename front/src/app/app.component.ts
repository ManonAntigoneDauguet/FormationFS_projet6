import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public hideHeader = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.hideHeader = this.router.url == "/"
    })
  }

}
