import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {CommentModel} from '../comment.model';
import {TopicsService} from '../topics.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {

  @Input()
  public comment: CommentModel;

  @Input()
  public reply: boolean;

  public newComment = new CommentModel();

  public showReply: boolean = false;
  public showEdit: boolean = false;
  public showHistory: boolean = false;

  public canEdit: boolean = false;

  constructor(public readonly authService: AuthService, private readonly topicsService: TopicsService) {
  }

  public ngOnInit(): void {

    this.canEdit = this.authService.user._id == this.comment.createdBy.id;
  }

  public vote(vote: '+1' | '-1'): void {
    this.topicsService.voteComment(this.comment.topic_id, this.comment._id, vote).subscribe((comment: CommentModel) => {
      const comments = [...this.comment.comments];
      Object.assign(this.comment, comment); // keep ref
      this.comment.comments = comments;
    });
  }

  c
  public postReply(): void {
    if (this.newComment.text) {
      this.topicsService.createCommentReply(this.comment.topic_id, this.comment._id, this.newComment).subscribe((comment: CommentModel) => {
        this.comment.comments.unshift(comment);
        this.newComment = new CommentModel();
        this.showReply = false;
      });
    }
  }

  public postUpdate(): void {
    if (this.comment.text) {
      this.topicsService.updateComment(this.comment.topic_id, this.comment._id, this.comment).subscribe((comment: CommentModel) => {
        const comments = [...this.comment.comments];
        Object.assign(this.comment, comment); // keep ref
        this.comment.comments = comments;
        this.showEdit = false;
      });
    }
  }
}
