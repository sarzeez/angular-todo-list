import { Component, OnInit } from '@angular/core';
import { IPost, Post } from './post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './post.service';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit {
  public posts: Post[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  editPost(post: Post) {
    this.router.navigate(['form', { ...post }], { relativeTo: this.route });
  }

  navigateToForm() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe(() => {
      this.getPosts();
    });
  }

  getPosts() {
    this.postService.get().subscribe((data) => {
      this.posts = data;
    });
  }
}
