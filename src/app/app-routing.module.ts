import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full' },
  {path: "list", component: UserListComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'navbar/:id', component: NavbarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
