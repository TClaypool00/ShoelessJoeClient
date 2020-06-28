import { Component, OnInit, ElementRef } from '@angular/core';
import { first } from "rxjs/operators";
import { Users } from "../models/users";
import { AuthenticationService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser:Users;

  constructor(private service: AuthenticationService, private router: Router) {
    this.service.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

  toogle() {
    var menu = document.getElementById("links");
    if(menu.style.display == "block")
      menu.style.display = "none";
    else
      menu.style.display = "block"
  }

  toggleUser() {
    var links = document.getElementById("user-links");
    if(links.style.display == "block")
      links.style.display = "none";
    else {
      links.style.display = "block"
    }
  }
}
