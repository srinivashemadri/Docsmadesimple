import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module'
import {UserModule} from './user/user.module';
import { HomeComponent } from './home/home.component';
import { PathnotfoundComponent } from './pathnotfound/pathnotfound.component'




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PathnotfoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    UserModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
