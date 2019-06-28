export class CommentModel {
  _id: string = null;

  topic_id: string = null;

  parent_id: string = null;

  text: string = ''; // must be defaulted for form builder

  createdAt: Date = new Date();

  createdBy: { name: string };

  comments: CommentModel[] = [];
}
