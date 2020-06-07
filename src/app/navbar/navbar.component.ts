import { Component, OnInit } from '@angular/core';
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

}
