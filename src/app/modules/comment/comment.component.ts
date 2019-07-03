import {Component, Input} from '@angular/core';
import {CommentModel} from '../comment.model';
import {TopicsService} from '../topics.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {

  @Input()
  public comment: CommentModel;

  @Input()
  public reply: boolean;

  public newComment = new CommentModel();

  public showReply: boolean = false;
  public showEdit: boolean = false;
  public showHistory: boolean = false;

  constructor(private readonly topicsService: TopicsService) {
  }

  public postReply() {
    if (this.newComment.text) {
      this.topicsService.createCommentReply(this.comment.topic_id, this.comment._id, this.newComment).subscribe((comment: CommentModel) => {
        this.comment.comments.unshift(comment);
        this.newComment = new CommentModel();
        this.showReply = false;
      });
    }
  }

  public postUpdate() {
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
