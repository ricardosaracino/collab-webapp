import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {CommentModel} from '../comment.model';
import {TopicModel} from '../topic.model';
import {TopicsService} from '../topics.service';

@Component({
  selector: 'app-topic-comments',
  templateUrl: './topic-comments.component.html',
  styleUrls: ['./topic-comments.component.css'],
})
export class TopicCommentsComponent implements OnInit {

  public topic: TopicModel;
  public topicComments: CommentModel[];
  public newComment = new CommentModel;

  public showReply = false;

  constructor(private readonly topicsService: TopicsService,
              private readonly route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.route.params.pipe(map(p => p.id)).subscribe(id => {
      if (id) {
        this.topicsService.findOneTopic(id).subscribe((topic: TopicModel) => {

          this.topic = topic;

          this.topicsService.findAllComments(id).subscribe(comments => this.topicComments = comments);
        });
      }
    });
  }

  public vote(vote: '+1' | '-1'): void {

  }

  public post() {
    if (this.newComment.text) {
      this.topicsService.createComment(this.topic._id, this.newComment).subscribe((comment: CommentModel) => {
        this.topicComments.unshift(comment);
        this.newComment = new CommentModel();
        this.showReply = false;
      });
    }
  }
}
