import { Component, OnInit } from '@angular/core';
import { Shoes, Users } from '../../models';
import { ShoesService, AuthenticationService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-shoes',
  templateUrl: './user-shoes.component.html',
  styleUrls: ['./user-shoes.component.css']
})
export class UserShoesComponent implements OnInit {
  shoes: Shoes[] = [];
  shoe: Shoes;
  error:string | undefined;
  errorMessage: string;
  currentUser:Users;

  constructor(private service: ShoesService, private router: Router, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
    this.getShoes();
  }

  getShoes() {
    return this.service.getShoes()
      .then(
        shoes => {
          this.shoes = shoes;
          this.resetError();
        },
        error =>  {
          this.handleError(error);
        }
      );
  }

  getShoe(id:number) {
    return this.service.getShoeById(id)
      .subscribe (
        shoe => {
          this.shoe = shoe;
          this.router.navigateByUrl('/shoe-details/' + id);
        }
      )
  }

  deleteShoe(id:number) {
    return this.service.removeShoeById(id).subscribe();
      
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
