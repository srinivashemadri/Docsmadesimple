import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';


import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ProfileComponent } from './profile/profile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component'
import {FormsModule} from '@angular/forms';
import { NewdocComponent } from './newdoc/newdoc.component';
import { ViewdocsComponent } from './viewdocs/viewdocs.component';
import { ViewsharedComponent } from './viewshared/viewshared.component'


@NgModule({
  declarations: [ProfileComponent, UpdateprofileComponent, NewdocComponent, ViewdocsComponent, ViewsharedComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ]
})
export class UserModule { }
