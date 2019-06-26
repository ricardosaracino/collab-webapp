import {Component, Input} from '@angular/core';
import {CommentModel} from '../comment.model';


/** todo this is just a hack to get the ide to stop complaining */
class CommentNodeModel extends CommentModel {
  public minimized = false;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {

  /**
   * https://netbasal.com/recursion-in-angular-components-1cd636269b12
   */
  @Input()
  public comments: CommentNodeModel[];

  @Input()
  public depth: number;
}
