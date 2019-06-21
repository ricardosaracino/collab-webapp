import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {TopicInterface} from '../topic.interface';
import {TopicsService} from '../topics.service';
import {TopicTableDataSource} from './topic-table-datasource';

@Component({
  selector: 'app-topic-table',
  templateUrl: './topic-table.component.html',
  styleUrls: ['./topic-table.component.css'],
})
export class TopicTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<TopicInterface>;

  dataSource: TopicTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'description', 'createdAt'];

  constructor(private readonly topicsService: TopicsService) {
  }

  ngOnInit() {
    this.dataSource = new TopicTableDataSource(this.topicsService);
  }

  ngAfterViewInit() {
    this.dataSource.setSort(this.sort);
    //this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
