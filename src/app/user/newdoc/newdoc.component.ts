import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';
import {Toast} from 'materialize-css'
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-newdoc',
  templateUrl: './newdoc.component.html',
  styleUrls: ['./newdoc.component.css']
})
export class NewdocComponent implements OnInit,OnDestroy {

  constructor( private router: Router ,public ds: DataService ,private auth: AngularFireAuth, private db: AngularFirestore) { }
  progressspinning:boolean;
  isDataloading: boolean;
  user;
  Datashared: boolean = false;
  ngOnInit() {
    this.isDataloading = true;
    this.auth.authState.subscribe((us)=>{
      this.isDataloading = false;
      this.user = us;
      console.log(this.user)
    })
    

    if(this.ds.readDocument() != null)
      this.Datashared = true;
    else
      this.Datashared = false;

  }
  ngOnDestroy(){
    
    this.ds.writeDocument(null);
    

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

      const newobj={
        ...this.ds.readDocument(),
        'filetype': this.filetype,
        'fileurl': this.fileurl
      }

      this.ds.writeDocument(newobj);
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
      const name = "Documents/"+ this.user.email+"/"+ ts+"-"+ this.file.name ;;
      
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
          'filename': name
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

  update(Form: NgForm){
    const ts = this.ds.readDocument()['id'];
    if(this.file != null){
      const ref = firebase.storage().ref();

      ref.child(this.ds.readDocument()['filename']).delete().catch((err)=>{
        
      })

      new Toast({
        html: 'File is being uploaded! Please wait',
        classes: 'rounded green center-text',
        displayLength: 4000
      });
      
      
      const name = "Documents/"+ this.user.email+"/"+ ts+"-"+ this.file.name ;
      const metadata ={
        contentType: this.file.type
      }
      
      let task = ref.child(name).put(this.file, metadata);
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
          'filename': name
        }
        delete obj['file'];
        this.db.collection("users").doc(this.user.email).collection("documents").doc(ts).set(obj).then(()=>{
          this.progressspinning = false;
          new Toast({
            html: 'File Uploaded successfully!',
            classes: 'rounded green center-text',
            displayLength: 2000
          });
          this.router.navigate(['/viewdocuments/']);
          
        }).catch((err)=>{
          new Toast({
            html: 'Some error occured! Please try after some time',
            classes: 'rounded red center-text',
            displayLength: 4000
          });
      })
      });

    }
    else{

      const obj ={
        ...Form.value,
        'switch': Form.value.switch == true? true : false,
        'fileurl': this.ds.readDocument()['fileurl'],
        'authorname': this.user.displayName,
        'authoremail': this.user.email,
        'filetype': this.ds.readDocument()['filetype'],
        'date': 'On '+ (new Date()).toLocaleDateString()+ ' At ' + (new Date()).toLocaleTimeString() ,
        'filename': this.ds.readDocument()['filename']
      }
      console.log(obj);
      delete obj['file'];
        this.db.collection("users").doc(this.user.email).collection("documents").doc(ts).set(obj).then(()=>{
          this.progressspinning = false;
          new Toast({
            html: 'Document Updated successfully!',
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

    }

    
  }


}
