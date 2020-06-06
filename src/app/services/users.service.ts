import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "../models/users";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  header:any;

  constructor(private http:HttpClient) {
    const headerSettings: { [name: string]: string | string[]  } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   private baseUrl = environment.ApiBaseUrl;

   getUsers() {
     return this.http.get<Users[]>(`${this.baseUrl}Users`)
      .toPromise();
   }

   getUserById(id:number) {
    return this.http.get<Users[]>(`${this.baseUrl}Users/` + id)
    .toPromise()
   }

   postUser(user: Users) {
     return this.http.post<Users>(`${this.baseUrl}Users`, user)
     .toPromise();
   }

   removeUserById(id:number) {
     return this.http.delete<Users>(`${this.baseUrl}Users/` + id)
     .toPromise();
   }

   updateUserById(id:number, user:Users) {
     return this.http.put(`${this.baseUrl}Users/` + id, user)
     .toPromise();
   }
}
