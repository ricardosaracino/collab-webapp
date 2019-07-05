import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CommentModel} from './comment.model';
import {TopicModel} from './topic.model';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {

  readonly apiUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {
  }

  public createTopic(topic: TopicModel): Observable<TopicModel> {
    return this.http.post<TopicModel>(`${this.apiUrl}/topics`, topic);
  }

  public updateTopic(id: string, topic: TopicModel): Observable<TopicModel> {
    return this.http.post<TopicModel>(`${this.apiUrl}/topics/${id}`, topic);
  }

  public deleteTopic(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/topics/${id}`);
  }

  public findAllTopics(): Observable<TopicModel[]> {
    return this.http.get<TopicModel[]>(`${this.apiUrl}/topics`);
  }

  public findOneTopic(id: string): Observable<TopicModel> {
    return this.http.get<TopicModel>(`${this.apiUrl}/topics/${id}`);
  }


  public createComment(topicId: string, comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.apiUrl}/topics/${topicId}/comments`, comment);
  }

  public updateComment(topicId: string, commentId: string, comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.apiUrl}/topics/${topicId}/comments/${commentId}`, comment);
  }

  public createCommentReply(topicId: string, commentId: string, comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.apiUrl}/topics/${topicId}/comments/${commentId}/comments`, comment);
  }

  public voteComment(topicId: string, commentId: string, vote: '+1' | '-1'): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${this.apiUrl}/topics/${topicId}/comments/${commentId}/vote`, {vote});
  }

  public findAllComments(topicId: string): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.apiUrl}/topics/${topicId}/comments`);
  }
}
