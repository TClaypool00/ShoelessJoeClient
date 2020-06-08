import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Shoes, Users } from '../models';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthenticationService, UsersService, ShoesService } from '../services'

@Component({
  selector: 'app-shoes-form',
  templateUrl: './shoes-form.component.html',
  styleUrls: ['./shoes-form.component.css']
})
export class ShoesFormComponent implements OnInit {
  submited = false;
  loading = false;
  error: string | undefined;
  shoeForm: FormGroup;
  currentUser: Users;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ShoesService, userService: UsersService, private authService: AuthenticationService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.shoeForm = this.formBuilder.group ({
      bothShoes: [false, Validators.required],
      manufacter: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      isSold: [false, Validators.required],
      rightSize: [''],
      leftSize: ['']
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

  get f() { return this.shoeForm.controls; }

  submit() {
    this.submited = true;
    this.loading = true;
    const newShoe: Shoes = {
      bothShoes: this.shoeForm.value.bothShoes,
      manufacter: this.shoeForm.value.manufacter,
      model: this.shoeForm.value.model,
      color: this.shoeForm.value.color,
      isSold: this.shoeForm.value.isSold,
      rightSize: this.shoeForm.value.rightSize,
      leftSize: this.shoeForm.value.leftSize,
      userId: this.currentUser.userId,
      userFirstName: this.currentUser.firstName,
      userLastName: this.currentUser.lastName
    };
    this.service.PostShoe(newShoe)
      .then(
        shoe => {
          if(this.error) {
            this.router.navigate(['/shoe-form']);
          } else {
            this.resetError();
          }
        },
        error => this.handleError(error)
      );

      setTimeout(() => {
        this.router.navigate(['/browse'])
      }, 5000);
  }
}
