import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { BrowseComponent } from './browse/browse.component';
import { ShoeDetailsComponent } from './browse/shoe-details/shoe-details.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'browse', component : BrowseComponent},
  {path: 'browse/shoe-details', component: ShoeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
