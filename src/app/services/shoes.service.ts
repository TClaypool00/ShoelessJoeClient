import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shoes } from '../models/shoes';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShoesService {
  header:any;
  constructor(private http:HttpClient, ) {
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);

   }

   private baseUrl = environment.ApiBaseUrl;

   private handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> => {
      console.error(operation + " " + error);
      return of(result as T);
    };
}

   getShoes() {
     return this.http.get<Shoes[]>(`${this.baseUrl}Shoes`)
     .toPromise()
   }

   getShoeById(id:number) : Observable<Shoes>{
    return this.http.get<Shoes>(`${this.baseUrl}Shoes/` + id)
    .pipe(
      catchError(this.handleError<Shoes>('getShoeById'))
    );
    
   }

   PostShoe(shoe: Shoes) {
    return this.http.post<Shoes>(`${this.baseUrl}Shoes`, shoe)
    .toPromise();
   }

   removeShoeById(id:number) {
     return this.http.delete<Shoes>(`${this.baseUrl}Shoes/` + id)
   }

   updateShoeById(id: number, shoe:Shoes) {
     return this.http.put<Shoes>(`${this.baseUrl}Shoes/` + id, shoe)
   }
}