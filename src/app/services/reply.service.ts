import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Reply } from "../models";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  list: Reply;

  constructor(private http: HttpClient) { }

  private baseUrl = environment.ApiBaseUrl;

  getReplies() {
    return this.http.get<Reply[]>(`${this.baseUrl}Replies`)
      .toPromise();
  }

  getReply(id:number) {
    return this.http.get<Reply>(`${this.baseUrl}Repliese/` + id)
      .toPromise();
  }

  postReply(reply: Reply) {
    return this.http.post<Reply>(`${this.baseUrl}Replies`, reply)
      .toPromise();
  }

  deleteReply(id:number) {
    return this.http.delete<Reply>(`${this.baseUrl}Repliese/` + id)
      .toPromise();
  }

  updateReply(id:number, reply:Reply) {
    return this.http.put<Reply>(`${this.baseUrl}Repliese/` + id, reply)
      .toPromise();
  }
}
