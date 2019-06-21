import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {TopicTableComponent} from './topic-table.component';

describe('TopicTableComponent', () => {
  let component: TopicTableComponent;
  let fixture: ComponentFixture<TopicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicTableComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
