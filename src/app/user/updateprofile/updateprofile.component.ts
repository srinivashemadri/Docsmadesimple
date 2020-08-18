import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {Toast} from 'materialize-css'
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  user:object;
  isLoading:boolean;
  progressspinning:boolean;
  email:string ='';
  name:string ='';
  spinnerload:boolean = false;
  isLoding:boolean = false;
  authorized: boolean
  

  ngOnInit() {
    this.isLoading = true;
    
    this.auth.authState.subscribe((us)=>{
      this.authorized = (us != null)
      this.isLoading = false;
      this.email = us.email;
      this.name = us.displayName;
      this.user= us;
      this.fileurl = us.photoURL;

    })
  }

  

  file:File;
  fileurl: string|ArrayBuffer="";
  filechanged:boolean = false;
  getfile(file: File)
  {
    
    let reader = new FileReader();
    this.file = file;
    this.filechanged = true;
    reader.readAsDataURL(this.file);
    reader.onload= ()=>{
      this.fileurl= reader.result;
      
    }

  }

  uploadimage(){

      if(this.file != null){
        const ref = firebase.storage().ref();
        const name = "profilepictures/"+this.email;
        
        let task = ref.child(name).put(this.file);
        this.progressspinning=true;
        task.then(snapshot=> snapshot.ref.getDownloadURL()).then(url=>{
          
          this.auth.auth.currentUser.updateProfile({photoURL: url}).then(()=>{
            this.progressspinning=false;
            this.file = null;
            new Toast({
              html: 'Profile picture updated successfully!',
              classes: 'rounded green center-text',
              displayLength: 2000
            });
          });
        });

      }
      else{
        new Toast({
          html: 'Please select a new image',
          classes: 'rounded red center-text',
          displayLength: 2000
        });
      }
  }

  updateprofile(Form:NgForm){
    if(Form.valid){
      
      this.progressspinning = true;
      this.auth.auth.currentUser.updateProfile({displayName: Form.value.name}).then(()=>{
        this.progressspinning = false;
        new Toast({
          html: 'Profile updated successfully!',
          classes: 'rounded green center-text',
          displayLength: 2000
        });
      })
    }
  }

  deletemyaccount(){
    this.auth.auth.currentUser.delete().then(()=>{
      this.router.navigate(['/home']);
      new Toast({
        html: 'Account Deletion Successful!',
        classes: 'rounded green center-text',
        displayLength: 2000
      });
    }).catch((err)=>{
      console.log(err);
      new Toast({
        html: 'Account Deletion Unsuccessful! ' + err.message,
        classes: 'rounded red center-text',
        displayLength: 4000
      });
    });
  }

  changepwd(){
    this.auth.auth.sendPasswordResetEmail(this.auth.auth.currentUser.email).then(()=>{
      var modaltrigger = document.getElementById('passwordresetmodaltrigger');
      modaltrigger.click();
    })
  }

}
