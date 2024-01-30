import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { ProperyDetailsComponent } from './components/propery-details/propery-details.component';


const routes: Routes = [
  //home
  {path: '', redirectTo: '/product-list', pathMatch: 'full' },
  {path: "product-list",title: "List", component: PropertyListComponent},  
  { path: 'product-list/:id', component: ProperyDetailsComponent  },
  //blog
  {path: 'blog', title : 'Blog', component: BlogComponent,  
    children: [{path: "blogpage",title: "List2", component: PropertyListComponent}]},
    //login
    //blog
  //invalid link
  {path: '**',title: "Not Found", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
