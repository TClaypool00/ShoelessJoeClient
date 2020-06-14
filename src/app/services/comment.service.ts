import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Comments } from "../models";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }

  private baseUrl = environment.ApiBaseUrl;

  getComments() {
    return this.http.get<Comments[]>(`${this.baseUrl}/Comments`)
      .toPromise();
  }

  getCommentById(id: number) {
    return this.http.get<Comments>(`${this.baseUrl}Comments/` + id)
      .toPromise();
  }

  postComment(comment: Comments) {
    return this.http.post<Comments>(`${this.baseUrl}Comments`, comment)
      .toPromise();
  }

  deleteComment(id: number) {
    return this.http.delete<Comments>(`${this.baseUrl}Comments/` + id)
      .toPromise();
  }

  updateComment(id: number, comment: Comments) {
    return this.http.put<Comments>(`${this.baseUrl}Comments/` + id, comment)
      .toPromise();
  }
}
