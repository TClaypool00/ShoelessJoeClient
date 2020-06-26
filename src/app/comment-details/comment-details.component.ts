import { Component, OnInit } from '@angular/core';
import { Users, Comments, Reply, Shoes } from '../models';
import { AuthenticationService, CommentService,ReplyService, ShoesService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {
  currentUser: Users;
  currentComment: Comments;
  currentShoe: Shoes;
  replyForm: FormGroup;
  replies: Reply[] = [];
  reply: Reply;
  date = new Date((new Date().getUTCDate()))

  constructor(private service: CommentService, private authService: AuthenticationService, private route: ActivatedRoute, private router: Router,
    private replYService: ReplyService, private shoeService: ShoesService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.service.getCommentById(id)
      .then(comment => {
        this.currentComment = comment;
        this.shoeService.getShoeById(comment.shoeId)
          .subscribe(shoe => {
            this.currentShoe = shoe;
          })
      });

    this.getReplies()
  }

  createReply() {
    var body = ((document.getElementById("bodyHTML") as HTMLInputElement).value)

    const newReply: Reply = {
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

  async getReplies() {
    const replies = await this.replYService.getReplies();
    this.replies = replies;
  }

  async decline() {
    const comment = await this.service.deleteComment(this.currentComment.commentId);
    this.currentComment = comment;
    this.router.navigateByUrl('/browse');

  }
}
