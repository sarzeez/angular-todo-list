import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost, IPostRequest } from './post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './post.service';

@Component({
  selector: 'post-form',
  template: `<div class="container-sm p-5">
    <div>
      <button (click)="backToList()" class="btn btn-secondary btn-sm mb-3">
        Back To List
      </button>
      <h2>{{ postForm.value.id ? 'Update' : 'Create' }} Post</h2>
      <form [formGroup]="postForm" class="row g-3" (ngSubmit)="onSubmit()">
        <div class="form-group ">
          <label for="postTitle">Title</label>
          <input
            id="postTitle"
            type="text"
            class="form-control"
            placeholder="Title"
            formControlName="title"
            [class.is-invalid]="getPostTitle?.invalid && getPostTitle?.touched"
          />
          <div *ngIf="getPostTitle?.invalid && getPostTitle?.touched">
            <small
              *ngIf="getPostTitle?.errors?.['required']"
              class="text-danger"
              >Title is required</small
            >
            <small
              *ngIf="getPostTitle?.errors?.['minlength']"
              class="text-danger"
              >Title must be at least 5 characters</small
            >
          </div>
        </div>
        <div class="form-group">
          <label for="postBody">Body</label>
          <input
            type="text"
            class="form-control"
            id="postBody"
            placeholder="Description"
            formControlName="body"
            [class.is-invalid]="getPostBody?.invalid && getPostBody?.touched"
          />
          <div *ngIf="getPostBody?.invalid && getPostBody?.touched">
            <small *ngIf="getPostBody?.errors?.['required']" class="text-danger"
              >Description is required</small
            >
            <small
              *ngIf="getPostBody?.errors?.['minlength']"
              class="text-danger"
              >Description must be at least 25 characters</small
            >
          </div>
        </div>
        <button
          [disabled]="postForm.invalid"
          type="submit"
          class="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  </div>`,
})
export class PostFormComponent implements OnInit {
  public postForm!: FormGroup;

  get getPostTitle() {
    return this.postForm.get('title');
  }

  get getPostBody() {
    return this.postForm.get('body');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    this.postForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(25)]],
    });

    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      const title = params.get('title');
      const body = params.get('body');
      if (id && title && body) {
        let post: IPost = { id, title, body };
        this.postForm.patchValue(post);
      }
    });
  }

  backToList() {
    this.router.navigate(['posts']);
  }

  onSubmit() {
    if (this.postForm.value.id) {
      const { title, body } = this.postForm.value;
      this.updatePost(this.postForm.value.id, { title, body });
      return;
    }
    this.createPost({
      title: this.postForm.value.title,
      body: this.postForm.value.body,
    });
  }

  createPost(post: IPostRequest) {
    this.postService.createPost(post).subscribe((data) => {
      this.backToList();
    });
  }

  updatePost(id: number, post: IPostRequest) {
    this.postService.updatePost(id, post).subscribe(() => {
      this.backToList();
    });
  }
}
