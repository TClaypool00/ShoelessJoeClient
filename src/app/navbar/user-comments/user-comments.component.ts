import { Component, OnInit } from '@angular/core';
import { CommentService, AuthenticationService, ShoesService } from 'src/app/services';
import { Users, Comments, Shoes } from 'src/app/models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit {
  currentUser: Users;

  comment: Comments;
  sellComment: Comments;
  
  buyComments: Comments[] = [];
  sellComments: Comments[] = [];

  sellShoe: Shoes[] = [];

  error: string | undefined;
  errorMessage: string;

  constructor(private service: CommentService, private authService: AuthenticationService, private router: Router, private shoeService: ShoesService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getCommentsByCurrentUser();
    // this.getSellCommentsByUser();
  }

  async getCommentsByCurrentUser() {
    try {
      const comments = await this.service.getComments(this.currentUser.userId.toString());
      this.buyComments = comments;
      this.resetError();
    }
    catch (error) {
      this.handleError(error);
    }
  }

  // async getSellCommentsByUser() {
  //   const sell = await this.service.getComments(this.sellComment.userId.toString());
  //   this.sellComments = sell;
  // }

  async getComment(id: number) {
    const comment = await this.service.getCommentById(id);
    this.comment = comment;
    this.router.navigateByUrl('/comments-details/' + id);
  }

  resetError() {
    this.error = undefined;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.error = `An error occurred: ${error.error.message}`; //in the event of a network error. Add error message.
    } else {
      this.error = `Backend returned code ${error.status}, body was: ${error.error}`; //If the response status code was an error then display said error
    }
  }
}
