import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SessionUserService } from 'src/app/core/services/sessionUser/session-user.service';


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

  constructor(
    private sessionUserService: SessionUserService,
  ) { }

  ngOnInit(): void {
    this.sessionUserService.logout();
  }

}
