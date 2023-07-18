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
