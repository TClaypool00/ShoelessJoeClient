import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { BrowseComponent } from './browse/browse.component';
import { ShoeDetailsComponent } from './browse/shoe-details/shoe-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helper/auth.guard';
import { ShoesFormComponent } from './shoes-form/shoes-form.component';
import { UserShoesComponent } from './navbar/user-shoes/user-shoes.component';
import { EditProfileComponent } from './navbar/edit-profile/edit-profile.component';
import { UserCommentsComponent } from './navbar/user-comments/user-comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';

const routes: Routes = [
  {path: 'browse', component : BrowseComponent, canActivate: [AuthGuard]},
  {path: 'shoe-form', component: ShoesFormComponent, canActivate: [AuthGuard]},
  {path: 'shoe-details/:id', component: ShoeDetailsComponent},
  {path: 'addComment/:id', component: AddCommentComponent, canActivate: [AuthGuard]},
  {path: 'comments-details/:id', component: CommentDetailsComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent },
  {path: 'user/myShoes', component: UserShoesComponent, canActivate: [AuthGuard]},
  {path: 'user/myComments', component: UserCommentsComponent, canActivate: [AuthGuard]},
  {path: 'user/profile', component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
