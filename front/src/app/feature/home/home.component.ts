import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive
  ]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  login() {
    alert('Login !');
  }

  register() {
    alert('Register !');
  }
}
