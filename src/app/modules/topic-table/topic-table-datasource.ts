import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TopicInterface} from '../topic.interface';
import {TopicsService} from '../topics.service';

export interface TopicTableItem extends TopicInterface {
}

/**
 * Data source for the TopicTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TopicTableDataSource extends DataSource<TopicTableItem> {

  public dataSubject = new BehaviorSubject<TopicTableItem[]>([]);
  private sort: MatSort;
  private paginator: MatPaginator;

  constructor(private readonly topicsService: TopicsService) {
    super();

    this.topicsService.findAllTopics().pipe(
      catchError(() => of([])),
    ).subscribe(data => this.dataSubject.next(data));

  }

  public setSort(sort: MatSort) {
    this.sort = sort;
    this.sort.sortChange.subscribe(() => this.dataSubject.next(this.getSortedData(this.dataSubject.getValue())))
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TopicTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    /*const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));*/

    return this.dataSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.dataSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TopicTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TopicTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        // case 'createdAt':
        //   return compare(a.createdAt.toISOString(), b.createdAt.toISOString(), isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
