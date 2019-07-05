export class TopicModel {
  _id: string = null;

  title: string = '';

  description: string = '';

  comments: any[];

  createdAt: Date = new Date();

  createdBy: { id: string, name: string };

  upVotes: [{ id: string, name: string }]
}
