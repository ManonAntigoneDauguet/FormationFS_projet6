import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionUserService } from '../../services/sessionUser/session-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isLogged$: Observable<boolean> = this.sessionUserService.isLogged$();

  public displayMenu = false;

  constructor(
    private sessionUserService: SessionUserService
  ) { }

  openMenu() {
    this.displayMenu = !this.displayMenu;
  }
}
