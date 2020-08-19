import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router, private zone: NgZone) { }

  email:string = '';

  ngOnInit() {

    this.auth.authState.subscribe((user)=>{
      
    })
    
  }

  Signup(Form: NgForm){
    if(Form.valid){
      
      if(Form.value.password == Form.value.cf_password){
        this.auth.auth.createUserWithEmailAndPassword(Form.value.email, Form.value.password).then((result)=>{
          result.user.updateProfile(
            {displayName: Form.value.Firstname + " " + Form.value.Lastname,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/docs-made-easier.appspot.com/o/Emptyprofilepic.PNG?alt=media&token=c1d3ff2d-b545-413c-a439-4a0ef2ac12a0',

          }).then(()=>{
            result.user.sendEmailVerification().then(()=>{
              var modaltrigger = document.getElementById('signupmodaltrigger');
              modaltrigger.click();
              this.auth.auth.signOut();
              this.email= Form.value.email;
            }).catch((err)=>{
              
            })
            
          })
          
        }).catch((err)=>{
          
        })
      }
      else{

      }
      

    }
    else{
      alert("Not valid")
    }
  }

  signupwithgoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();

    this.auth.auth.signInWithPopup(provider).then((user)=>{
      this.zone.run(()=>{
        
        this.router.navigate(['/profile']);
      })
      
    });
  }
}
