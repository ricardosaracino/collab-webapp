import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopicFeedComponent} from './topic-feed.component';

describe('TopicFeedComponent', () => {
  let component: TopicFeedComponent;
  let fixture: ComponentFixture<TopicFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicFeedComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
