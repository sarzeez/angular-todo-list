import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from '../post/post-list.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UserComponent } from '../user/user.component';
import { PostFormComponent } from '../post/post-form.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent,
  },
  {
    path: 'posts/form',
    component: PostFormComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  PostListComponent,
  PostFormComponent,
  PageNotFoundComponent,
  UserComponent,
];
