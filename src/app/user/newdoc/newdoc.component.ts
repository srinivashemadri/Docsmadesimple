import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import {Toast} from 'materialize-css'
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-newdoc',
  templateUrl: './newdoc.component.html',
  styleUrls: ['./newdoc.component.css']
})
export class NewdocComponent implements OnInit {

  constructor( private auth: AngularFireAuth, private db: AngularFirestore) { }
  progressspinning:boolean;
  isDataloading: boolean;
  user;
  ngOnInit() {
    this.isDataloading = true;
    this.auth.authState.subscribe((us)=>{
      this.isDataloading = false;
      this.user = us;
      
      
    })

  }

  file:File;
  fileurl: string| ArrayBuffer ='';
  
  filetype:string;
  isfileloadingfromlocal:boolean;
  getfile(file: File)
  {
    this.isfileloadingfromlocal= true;
    let reader = new FileReader();
    this.file = file;
    this.filetype = this.file.type;    
    reader.readAsDataURL(this.file);
    reader.onload= ()=>{
      this.isfileloadingfromlocal= false;
      this.fileurl =reader.result;

      new Toast({
        html: 'File Has been selected',
        classes: 'rounded green center-text',
        displayLength: 2000
      });
    }
    

  }

  async Upload(Form: NgForm){
    
    if(this.file != null){
      new Toast({
        html: 'File is being uploaded! Please wait',
        classes: 'rounded green center-text',
        displayLength: 4000
      });
      const ref = firebase.storage().ref();
      const ts = Date.now().toString();
      const name = "Documents/"+ this.user.email+"/"+ ts;
      
      let task = ref.child(name).put(this.file);
      this.progressspinning=true;

      task.then(snapshot=> snapshot.ref.getDownloadURL()).then(url=>{
        const obj ={
          ...Form.value,
          'switch': Form.value.switch == true? true : false,
          'fileurl': url,
          'authorname': this.user.displayName,
          'authoremail': this.user.email,
          'filetype': this.file.type,
          'date': 'On '+ (new Date()).toLocaleDateString()+ ' At ' + (new Date()).toLocaleTimeString() ,
        }
        delete obj['file'];
        this.db.collection("users").doc(this.user.email).collection("documents").doc(ts).set(obj).then(()=>{
          this.progressspinning = false;
          new Toast({
            html: 'File Uploaded successfully!',
            classes: 'rounded green center-text',
            displayLength: 2000
          });
        }).catch((err)=>{
          new Toast({
            html: 'Some error occured! Please try after some time',
            classes: 'rounded red center-text',
            displayLength: 4000
          });
      })
        
        
        

        
        
      });

    }


  }

}
