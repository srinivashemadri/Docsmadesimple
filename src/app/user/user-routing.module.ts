import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { NewdocComponent } from './newdoc/newdoc.component';
import { ViewdocsComponent } from './viewdocs/viewdocs.component';
import { ViewsharedComponent } from './viewshared/viewshared.component';
import { PathnotfoundComponent } from '../pathnotfound/pathnotfound.component';



const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'updateprofile', component: UpdateprofileComponent},
  {path: 'uploadnewdocument', component: NewdocComponent},
  {path: 'viewdocuments', component: ViewdocsComponent},
  {path: 'viewshared/:email/:id', component: ViewsharedComponent},
  {path: '**',component: PathnotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
