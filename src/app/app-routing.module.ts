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

const routes: Routes = [
  {path: 'browse', component : BrowseComponent, canActivate: [AuthGuard]},
  {path: 'shoe-form', component: ShoesFormComponent, canActivate: [AuthGuard]},
  {path: 'shoe-details', component: ShoeDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent },
  {path: 'user/myShoes', component: UserShoesComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
