import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Users } from "../models/users";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UsersService } from "../services/users.service";
// Add Toastr later

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  loading = false;
  error: string | undefined;
  RegisterForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: UsersService) { }
  
  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: [false, Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phoneNumber: ['', Validators.required]
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

  get f() { return this.RegisterForm.controls; }

  Register() {
    this.submitted = true;
    this.loading = true;
    const newUser: Users = {
      firstName: this.RegisterForm.value.firstName,
      lastName: this.RegisterForm.value.lastName,
      email: this.RegisterForm.value.email,
      password: this.RegisterForm.value.password,
      isAdmin: this.RegisterForm.value.isAdmin,
      street: this.RegisterForm.value.street,
      city: this.RegisterForm.value.city,
      state: this.RegisterForm.value.state,
      zip: this.RegisterForm.value.zip,
      phoneNumber: this.RegisterForm.value.phoneNumber,
    };
    this.service.postUser(newUser)
    .then(
      user => {
        if(this.error) {
          this.router.navigate(['/login']);
        } else {
          this.resetError();
        }
      },
      error => this.handleError(error)
    );

    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 5000);
  }
}
