import { Component, OnInit } from '@angular/core';
import { ShoesService, CommentService, AuthenticationService, DateService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { Shoes, Users, Comments } from '../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  currentShoe: Shoes;
  CurrentUser: Users;
  submitted = false;
  error: string | undefined;
  commentForm: FormGroup;


  constructor(private service: CommentService ,public shoeService: ShoesService, private authService: AuthenticationService, private route: ActivatedRoute,
    private router: Router,  private formBuilder:FormBuilder, private dateService: DateService) { 
    this.authService.currentUser.subscribe(x => this.CurrentUser = x);
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group ({
      messageHead: ['', Validators.required],
      messageBody: ['', Validators.required],
      commentDate: ['', Validators.required]
    });

    const id = +this.route.snapshot.paramMap.get('id');

    this.shoeService.getShoeById(id)
      .subscribe(shoe => {
        this.currentShoe = shoe;
      });
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.error = `An error occurred: ${error.error.message}`; //in the event of a network error. Add error message.
    } else {
      this.error = `Backend returned code ${error.status}, body was: ${error.error}`; //If the response status code was an error then display said error
    }
  }

  resetError() {
    this.error = undefined; //clears error message
  }

  get f() { return this.commentForm.controls; }

  submit() {
    this.submitted = true;

    const newComment: Comments = {
      messageHead: this.commentForm.value.messageHead,
      messageBody: this.commentForm.value.messageBody,
      commentDate: this.commentForm.value.commentDate,
      userId: this.CurrentUser.userId,
      userFirstName: this.CurrentUser.firstName,
      userLastName: this.CurrentUser.lastName,
      shoeId: this.currentShoe.shoeId,
      shoeManufacter: this.currentShoe.manufacter,
      shoeModel: this.currentShoe.model,
      rightSize: this.currentShoe.rightSize,
      leftSize: this.currentShoe.leftSize,
      shoeUserId: this.currentShoe.userId,
      shoeFirstName: this.currentShoe.userFirstName,
      shoeLastName: this.currentShoe.userLastName
    };

    this.service.postComment(newComment)
    this.router.navigateByUrl('user/myComments');
  }
}
