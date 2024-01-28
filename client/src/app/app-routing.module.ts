import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  //home
  {path: '', redirectTo: '/list', pathMatch: 'full' },
  {path: "list",title: "List", component: UserListComponent},  
  //blog
  {path: 'blog', title : 'Blog', component: BlogComponent,  
    children: [{path: "blogpage",title: "List2", component: UserListComponent}]},
  //houses to rent
  {path: 'properties', title : 'Properties', component: PropertiesComponent},
  { path: "properties/:id", component: PropertiesComponent},
  //invalid link
  {path: '**',title: "Not Found", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
