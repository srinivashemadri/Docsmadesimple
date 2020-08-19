import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private auth: AngularFireAuth,private router: Router, private zone: NgZone) { }

  header: string = '';
  message: string = '';
  signinsuccess :boolean;
  fgtpwdclicked:boolean = false;

  ngOnInit() {
  }

  signinwithgoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();

    this.auth.auth.signInWithPopup(provider).then((user)=>{
      this.zone.run(()=>{
        
        this.router.navigate(['/profile']);
      })
      
    });
  }

  Signin(Form: NgForm){
    if(Form.valid){
      this.auth.auth.signInWithEmailAndPassword(Form.value.email, Form.value.password).then((result)=>{
        if(result.user.emailVerified){
          this.router.navigate(['/profile']);
          this.signinsuccess = true;
        }
        else{
          this.signinsuccess = false;
          var modaltrigger = document.getElementById('modaltrigger');
          modaltrigger.click();
          this.auth.auth.signOut();
          this.header = 'Signup failed, Please verify your mail before logging in';
          this.message = 'A Verification Email has been sent to' + Form.value.email + ', Please click on the link provided in the email '
          
        }
      }).catch((err)=>{
        
        var modaltrigger = document.getElementById('modaltrigger');
        modaltrigger.click();
        this.signinsuccess = false;
        this.header = 'Signup failed';
        this.message = err.message;
      })
    }
    else{
      alert("Not valid")
    }
  }

  forgotpassword(Form: NgForm){
    if(Form.valid){
      this.auth.auth.sendPasswordResetEmail(Form.value.email).then(()=>{
        var modaltrigger = document.getElementById('modaltrigger');
        modaltrigger.click();
        this.signinsuccess = true;
        this.header = 'Success';
        this.message = 'An email with password reset link has been successfully sent to '+ Form.value.email +' Please click on that link inorder to reset your password';

      }).catch((err)=>{
        var modaltrigger = document.getElementById('modaltrigger');
        modaltrigger.click();
        this.signinsuccess = false;
        this.header = 'Failure occured while sending password reset link';
        this.message = err.message;
      });

    }
    else{
      alert("Please fill out email")
    }
  }

}
