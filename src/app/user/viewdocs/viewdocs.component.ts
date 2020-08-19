import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {  ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import {Toast} from 'materialize-css'
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/data.service';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-viewdocs',
  templateUrl: './viewdocs.component.html',
  styleUrls: ['./viewdocs.component.css']
})
export class ViewdocsComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer,private auth: AngularFireAuth, private ar: ActivatedRoute, private db: AngularFirestore,private router: Router,public ds: DataService) { }

  user;
  listofdocuments:object[] = [];
  filteredlistofdocuments:object[] = [];
  filterapplied:boolean = false;
  isLoading: boolean = false;
  currsharinglink:string = '';
  authorized:boolean;
  ngOnInit()  {
    this.isLoading = true;
    this.auth.authState.subscribe((us)=>{
      this.user = us;
      
      if(us != null){
       
        this.authorized= true;
          this.db.collection("users").doc(us.email).collection("documents").get().subscribe( async (result)=>{
    
            await result.forEach((document)=>{
              const obj={
                ...document.data(),
                'id': document.id
              }
              this.listofdocuments.unshift(obj)
            })
            
            this.isLoading = false;    
          })
          
        
      }
      else{
        this.isLoading = false;   
        this.authorized = false;
      }
      
      
      
    })
    
    
    
  }

  getSafeurl(a:string,b:string){
    const unsafeurl = "whatsapp://send?text=https://docs-made-easier.firebaseapp.com/viewshared/" + a+"/"+b;
    const safeurl = this.sanitizer.bypassSecurityTrustUrl(unsafeurl);
    
    return safeurl
  }

  sharinglink(id:string){
    this.currsharinglink = 'https://docs-made-easier.firebaseapp.com/viewshared/'+ this.user.email+'/'+id;
  }

  search(Form:NgForm){
    if(Form.valid){
      const val = Form.value.search;
      this.filterapplied = true;
      this.filteredlistofdocuments = this.listofdocuments.filter((document)=>{
        return (document['name'].toLowerCase().includes(val.toLowerCase()))
      })
    }
  }

  clear(Form: NgForm){
    this.filterapplied = false;
    this.filteredlistofdocuments = [];
    Form.reset();
  }

  copylink(){
    var copytext = document.getElementById("message");
    document.addEventListener('copy',(e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.currsharinglink );
      e.preventDefault();
      
    });
    
    
    document.execCommand('copy');
    new Toast({
      html: 'Copied to clipboard',
      classes: 'rounded green center-text',
      displayLength: 2000
    });

  }

  editdocument(document:object){
    
    this.ds.writeDocument(document);
    this.router.navigate(['/uploadnewdocument']);

  }

  deletedocument(id: string, filename: string){

   
    

    let a= confirm("Are you sure you want to delete this document?, This action can't be undone");
    if(a){
      const ref = firebase.storage().ref();
      const task = ref.child(filename).delete().then(()=>{
        
      });
      this.db.collection("users").doc(this.user.email).collection("documents").doc(id).delete().then(()=>{
        new Toast({
          html: 'Deletion successful',
          classes: 'rounded green',
          displayLength: 2000
        });
        this.listofdocuments = this.listofdocuments.filter((doc)=>{
          return !(doc['id'] == id);
        })

        this.filteredlistofdocuments = this.filteredlistofdocuments.filter((doc)=>{
          return !(doc['id'] == id);
        })
      })
    }
    

  }

}
