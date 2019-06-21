import {TopicInterface} from './topic.interface';

export class TopicModel implements TopicInterface {
  _id: string = null;
  title: string = ''; // must be defaulted for form builder
  createdAt: Date = null;
  description: string = '';
}
