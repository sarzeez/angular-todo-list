import { Component } from '@angular/core';
import { IPost } from './post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
})
export class PostListComponent {
  public posts: IPost[] = [
    {
      id: 1,
      title: 'React Course',
      body: 'Some description...',
    },
    {
      id: 2,
      title: 'Angular Course',
      body: 'Some description...',
    },
    {
      id: 3,
      title: 'Vue Course',
      body: 'Some description...',
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  editPost(post: IPost) {
    this.router.navigate(['form', { ...post }], { relativeTo: this.route });
  }

  navigateToForm() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }

  removePost(id: number) {
    const newPosts: IPost[] = this.posts.filter((item) => item.id !== id);
    this.posts = newPosts;
  }
}
