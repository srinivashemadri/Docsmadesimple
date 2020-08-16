import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {FormsModule} from '@angular/forms'
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import {environment} from '../../environments/environment.prod'
const config = environment.firebaseConfig;

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ]
})
export class AuthModule { }
