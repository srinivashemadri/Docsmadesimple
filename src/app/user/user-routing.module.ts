import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { NewdocComponent } from './newdoc/newdoc.component';
import { ViewdocsComponent } from './viewdocs/viewdocs.component';
import { ViewsharedComponent } from './viewshared/viewshared.component';



const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'updateprofile', component: UpdateprofileComponent},
  {path: 'uploadnewdocument', component: NewdocComponent},
  {path: 'viewdocuments/:email', component: ViewdocsComponent},
  {path: 'viewshared/:email/:id', component: ViewsharedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
