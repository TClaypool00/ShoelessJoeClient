import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ShoesService } from 'src/app/services';
import { Users, Shoes } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shoe-details',
  templateUrl: './shoe-details.component.html',
  styleUrls: ['./shoe-details.component.css']
})
export class ShoeDetailsComponent implements OnInit {
  currentShoe: Shoes;
  currentuser: Users

  constructor(public service: ShoesService, private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) { 
    this.currentuser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.service.getShoeById(id)
      .subscribe(shoe => {
        this.currentShoe = shoe;
      });
  }

  chooseShoe(id:number) {
    this.service.getShoeById(id)
      .subscribe (
        shoe => {
          this.currentShoe = shoe;
          this.router.navigateByUrl('')
        }
      )
  }
}
