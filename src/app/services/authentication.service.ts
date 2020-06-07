import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Users } from "../models/users";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;
  private apiUrl = environment.ApiBaseUrl;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): Users {
    return this.currentUserSubject.value;
   }

   login(email, password) {
     return this.http.post<any>(`${this.apiUrl}Users/authenticate`, { email, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
   }

   logout() {
     //removes currentUser and sets  it equal to null
     localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
   }
}
