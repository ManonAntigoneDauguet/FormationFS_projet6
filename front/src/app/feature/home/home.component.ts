import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule
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
