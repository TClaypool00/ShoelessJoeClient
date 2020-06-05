import { Component, OnInit } from '@angular/core';
import  {Shoes } from "../../models/shoes"
import { ShoesService } from 'src/app/services/shoes.service';

@Component({
  selector: 'app-shoe-details',
  templateUrl: './shoe-details.component.html',
  styleUrls: ['./shoe-details.component.css']
})
export class ShoeDetailsComponent implements OnInit {
  shoe: Shoes;

  constructor(public service: ShoesService) { }

  ngOnInit(): void {
  }

  reciveId($event) {
    this.shoe = $event;
  } 

}
