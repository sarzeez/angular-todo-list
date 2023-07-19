import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { GenericService } from '../config/generic.service';

@Injectable({
  providedIn: 'root',
})
export class PostService extends GenericService<Post> {
  constructor(private http: HttpClient) {
    super(http, Post, '/posts');
  }
}
