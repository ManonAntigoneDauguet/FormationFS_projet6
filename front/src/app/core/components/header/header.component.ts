import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionUserService } from '../../services/sessionUser/session-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLogged$!: Observable<boolean>;

  public displayMenu = false;

  constructor(
    private sessionUserService: SessionUserService
  ) { }

  ngOnInit(): void {
    this.isLogged$ = this.sessionUserService.isLogged$();
  }

  openMenu() {
    this.displayMenu = !this.displayMenu;
  }
}
