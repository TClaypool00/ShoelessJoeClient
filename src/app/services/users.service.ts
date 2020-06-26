import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "../models/users";
import { environment } from "../../environments/environment";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

   getUserById(id:number): Observable<Users>
   {
    return this.http.get<Users>(`${this.baseUrl}Users/` + id)
    .pipe(
      catchError(this.handleError<Users>(`getUserById`))
    );
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

   private handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> => {
      console.error(operation + " " + error);
      return of(result as T);
    };
}
}
