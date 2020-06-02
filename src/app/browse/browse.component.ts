import { Component, OnInit } from '@angular/core';
import { Shoes } from '../models/shoes';
import { ShoesService } from '../services/shoes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  shoes: Shoes[] = [];
  shoe: Shoes;
  error:string | undefined;
  errorMessage: string;

  constructor(public service: ShoesService) { }

  ngOnInit(): void {
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