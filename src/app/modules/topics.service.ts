import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TopicInterface} from './topic.interface';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {

  readonly apiUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {
  }

  public createTopic(topic: TopicInterface): Observable<TopicInterface> {
    return this.http.post<TopicInterface>(`${this.apiUrl}/topics`, topic);
  }

  public updateTopic(id: string, topic: TopicInterface): Observable<TopicInterface> {
    return this.http.post<TopicInterface>(`${this.apiUrl}/topics/${id}`, topic);
  }

  public deleteTopic(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/topics/${id}`);
  }

  public findAllTopics(): Observable<TopicInterface[]> {
    return this.http.get<TopicInterface[]>(`${this.apiUrl}/topics`);
  }

  public findOneTopic(id: string): Observable<TopicInterface> {
    return this.http.get<TopicInterface>(`${this.apiUrl}/topics/${id}`);
  }
}
