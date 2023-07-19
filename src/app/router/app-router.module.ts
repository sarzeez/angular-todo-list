import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from '../post/post-list.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UserComponent } from '../user/user.component';
import { PostFormComponent } from '../post/post-form.component';
import { LoginComponent } from '../auth/login.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/form',
    component: PostFormComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
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
  LoginComponent,
];
