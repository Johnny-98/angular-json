//default
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { UserListComponent } from './components/user-list/user-list.component';

//important
import { PreserveOrderPipe } from './custom-pipes/preserve-order.pipe';

//material stuff
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';


//ng stuff
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { TagModule } from 'primeng/tag';




@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PreserveOrderPipe,
    NotFoundComponent,
    BlogComponent,
    PropertiesComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    MatCardModule, 
    MatButtonModule,
    MatGridListModule,

    ButtonModule,
    MenubarModule,
    CardModule,
    CarouselModule,
    TagModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
