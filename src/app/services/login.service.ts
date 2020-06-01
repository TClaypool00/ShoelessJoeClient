import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //Variables
  url: string;
  token: string;
  header: any;

  constructor(private http: HttpClient) { 
    this.url = environment.ApiBaseUrl;
    
    const headerSettings: { [name: string]: string | string[];} = {};
    this.header = new HttpHeaders(headerSettings);
  }

  Login(model: any) {
    debugger;
    
    return this.http.post<any>(this.url + `Users/`, model, {headers: this.header});
  }

}
