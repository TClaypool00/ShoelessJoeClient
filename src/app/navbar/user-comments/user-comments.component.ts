import { Component, OnInit } from '@angular/core';
import { CommentService, AuthenticationService } from 'src/app/services';
import { Users, Comments } from 'src/app/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit {
  currentUser: Users;
  comment: Comments;
  comments: Comments[] = [];
  error: string | undefined;
  errorMessage: string;

  constructor(private service: CommentService, private authService: AuthenticationService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getCommentsByCurrentUser();
  }

  getCommentsByCurrentUser()  {
    return this.service.getComments()
      .then(
        comments => {
          this.comments = comments;
          this.resetError();
        },
        error => {
          this.handleError(error);
        }
      )
  }

  getComment(id: number) {
    return this.service.getCommentById(id)
      .then (
        comment => {
          this.comment = comment;
        }
      )
  }

  resetError() {
    this.error = undefined;
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      this.error = `An error occurred: ${error.error.message}`; //in the event of a network error. Add error message.
    } else {
      this.error = `Backend returned code ${error.status}, body was: ${error.error}`; //If the response status code was an error then display said error
      }
    }
}
