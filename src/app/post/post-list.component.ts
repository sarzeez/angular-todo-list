import { Component, OnInit } from '@angular/core';
import { IPost } from './post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './post.service';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit {
  public posts: IPost[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  editPost(post: IPost) {
    this.router.navigate(['form', { ...post }], { relativeTo: this.route });
  }

  navigateToForm() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.getPosts();
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
