import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {Toast} from 'materialize-css'
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  user:object;
  isLoading:boolean;
  progressspinning:boolean;
  email:string ='';
  name:string ='';
  spinnerload:boolean = false;
  isLoding:boolean = false;
  authorized: boolean;
  
  

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

  async deletemyaccount(){
    this.isLoading = true;
    const email = this.email;
    const ref = firebase.storage().ref();
    const name = "Documents/"+ this.email+"/";  
    const listref = ref.child(name);
    listref.listAll().then((res)=>{
      res.items.forEach((abc)=>{
        abc.delete();
      })    
    }).catch((err)=>{
        new Toast({
          html: 'Account Deletion Unsuccessful! ' + err.message,
          classes: 'rounded red center-text',
          displayLength: 10000
        });
    })
    let cnt =0;
    this.db.collection("users").doc(email).collection("documents").get().subscribe( async (result)=>{
      
      result.forEach(async (doc)=>{
        this.db.collection("users").doc(email).collection("documents").doc(doc.id).delete().then(()=>{
          
          cnt++;
          if(cnt == result.size){
            this.auth.auth.currentUser.delete().then(()=>{
              this.isLoading = false;
              this.router.navigate(['/home']);
              new Toast({
                html: 'Account Deletion Successful!',
                classes: 'rounded green center-text',
                displayLength: 2000
              });
            }).catch((err)=>{
              
              new Toast({
                html: 'Account Deletion Unsuccessful! ' + err.message,
                classes: 'rounded red center-text',
                displayLength: 10000
              });
            });
          }
        });
      })
    })
    
    
  }

  changepwd(){
    this.auth.auth.sendPasswordResetEmail(this.auth.auth.currentUser.email).then(()=>{
      var modaltrigger = document.getElementById('passwordresetmodaltrigger');
      modaltrigger.click();
    })
  }

}
