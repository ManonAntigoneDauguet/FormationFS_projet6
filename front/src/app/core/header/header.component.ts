import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public displayMenu = false;

  public isLogged = false;

  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    this.displayMenu = !this.displayMenu;
  }
}
