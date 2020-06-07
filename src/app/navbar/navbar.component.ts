import { Component, OnInit } from '@angular/core';
import { first } from "rxjs/operators";
import { Users } from "../models/users";
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser:Users;

  constructor(private service: AuthenticationService) {
    this.currentUser = this.service.currentUserValue;
   }

  ngOnInit(): void {
  }

}
