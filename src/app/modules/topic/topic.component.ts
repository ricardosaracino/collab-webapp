import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {TopicModel} from '../topic.model';
import {TopicsService} from '../topics.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {

  public form;

  constructor(private readonly fb: FormBuilder,
              private readonly topicsService: TopicsService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {

    this.form = fb.group(new TopicModel());

    route.params.pipe(map(p => p.id)).subscribe(id => {
      if (id) {
        this.topicsService.findOneTopic(id).subscribe((topic: TopicModel) => {
          this.form = fb.group(topic);
        });
      }
    });
  }

  ngOnInit() {
  }

  public save() {
    const service = (this.form.value._id) ? this.topicsService.updateTopic(this.form.value._id, this.form.value) :
      this.topicsService.createTopic(this.form.value);

    service.subscribe(() => this.router.navigate(['/topics']));
  }

  public delete() {
    this.topicsService.deleteTopic(this.form.value._id).subscribe(() => this.router.navigate(['/topics']));
  }
}
