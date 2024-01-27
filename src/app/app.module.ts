import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PreserveOrderPipe } from './custom-pipes/preserve-order.pipe';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './components/blog/blog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PropertiesComponent } from './components/properties/properties.component';

@NgModule({
  declarations: [
    //components
    AppComponent,
    UserListComponent,
    //pipes
    PreserveOrderPipe,
    NotFoundComponent,
    BlogComponent,
    PropertiesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
