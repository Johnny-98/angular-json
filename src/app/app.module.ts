import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreserveOrderPipe } from './custom-pipes/preserve-order.pipe';
import { UserListComponent } from './user-list/user-list.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    //components
    AppComponent,
    UserListComponent,
    //pipes
    PreserveOrderPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
