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

  constructor(private readonly topicsService: TopicsService) {
  }

  public post() {
    if (this.newComment.text) {

      console.log(this.comment);

      console.log(this.newComment);

      this.topicsService.createCommentReply(this.comment.topic_id, this.comment._id, this.newComment).subscribe((comment: CommentModel) => {
        this.comment.comments = []; // todo
        this.comment.comments.unshift(comment);
        this.newComment = new CommentModel();
        this.showReply = false;
      });
    }
  }
}
