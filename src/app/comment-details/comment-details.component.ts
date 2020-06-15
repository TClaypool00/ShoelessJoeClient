import { Component, OnInit } from '@angular/core';
import { Users, Comments } from '../models';
import { AuthenticationService, CommentService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {
  currentUser: Users;
  currentComment: Comments;

  constructor(private service: CommentService, private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.service.getCommentById(id)
      .then(comment => {
        this.currentComment = comment;
      })
  }

}
