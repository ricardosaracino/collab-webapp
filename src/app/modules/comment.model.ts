export class CommentModel {
  _id: string = null;

  topic_id: string = null;

  text: string = ''; // must be defaulted for form builder

  createdAt: Date = new Date();

  createdBy: { id: string, name: string };

  comments: CommentModel[] = [];

  updateHistory: { text: string, updatedAt: Date }[] = [];
}
