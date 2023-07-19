import { ResourceModel } from '../config/generic.model';

export interface IPost {
  id: number;
  title: string;
  body: string;
}

export interface IPostRequest {
  title: string;
  body: string;
}

export interface IPostResponse {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export class Post extends ResourceModel<Post> {
  public title!: string;
  public body!: string;

  constructor(model?: Partial<Post>) {
    super(model);
  }
}
