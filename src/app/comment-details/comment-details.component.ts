import { Component, OnInit } from '@angular/core';
import { Users, Comments, Reply } from '../models';
import { AuthenticationService, CommentService, DateService, ReplyService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {
  currentUser: Users;
  currentComment: Comments;
  replyForm: FormGroup;
  replies:Reply[] = [];
  reply:Reply;
  date = new Date((new Date().getDate()))

  constructor(private service: CommentService, private authService: AuthenticationService, private dateService: DateService, private route: ActivatedRoute,
    private router: Router, private formBuilder:FormBuilder, private replYService: ReplyService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.service.getCommentById(id)
      .then(comment => {
        this.currentComment = comment;
      });

    this.getReplies()
  }

  createReply() {
    var body = ((document.getElementById("bodyHTML") as HTMLInputElement).value)
    
    const newReply:Reply  = {
      replyBody: body,
      replyDate: this.date,
      commentId: this.currentComment.commentId,
      commentHead: this.currentComment.messageHead,
      replyUserId: this.currentUser.userId,
      replyUserFirstName: this.currentUser.firstName,
      replyUserLastName: this.currentUser.lastName
    }

    this.replYService.postReply(newReply);
  }

  getReplies() {
    return this.replYService.getReplies()
      .then(replies => {
        this.replies = replies;
      })
  }

  decline() {
    return this.service.deleteComment(this.currentComment.commentId)
    .then(comment => {
      this.currentComment = comment;
      this.router.navigateByUrl('/browse');
    })

  }
}
