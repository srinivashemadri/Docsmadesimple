import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {  ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import {Toast} from 'materialize-css'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-viewdocs',
  templateUrl: './viewdocs.component.html',
  styleUrls: ['./viewdocs.component.css']
})
export class ViewdocsComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer,private auth: AngularFireAuth, private ar: ActivatedRoute, private db: AngularFirestore) { }

  user;
  listofdocuments:object[] = [];
  filteredlistofdocuments:object[] = [];
  filterapplied:boolean = false;
  isLoading: boolean = false;
  currsharinglink:string = '';
  ngOnInit()  {
    this.auth.authState.subscribe((us)=>{
      this.user = us;
      
    })
    this.isLoading = true;
     this.ar.paramMap.subscribe((param)=>{
      this.db.collection("users").doc(param.get('email')).collection("documents").get().subscribe( async (result)=>{

        await result.forEach((document)=>{
          const obj={
            ...document.data(),
            'id': document.id
          }
          this.listofdocuments.unshift(obj)
        })
        console.log(this.listofdocuments);
        this.isLoading = false;    
      })
      
    })
    
    
  }

  getSafeurl(a:string,b:string){
    const unsafeurl = "whatsapp://send?text=https://docs-made-easier.web.app/viewshared/" + a+"/"+b;
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

}
