import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TopicModel} from '../topic.model';
import {TopicsService} from '../topics.service';

@Component({
  selector: 'app-topic-feed',
  templateUrl: './topic-feed.component.html',
  styleUrls: ['./topic-feed.component.css'],
})
export class TopicFeedComponent implements OnInit {

  public topics: TopicModel[];

  constructor(private readonly topicsService: TopicsService) {
  }

  ngOnInit() {
    this.topicsService.findAllTopics().pipe(
      catchError(() => of([])),
    ).subscribe(topics => this.topics = topics);
  }
}
