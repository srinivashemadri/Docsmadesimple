import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { async } from '@angular/core/testing';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-viewdocs',
  templateUrl: './viewdocs.component.html',
  styleUrls: ['./viewdocs.component.css']
})
export class ViewdocsComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private ar: ActivatedRoute, private db: AngularFirestore) { }

  user;
  listofdocuments:object[] = [];
  filteredlistofdocuments:object[] = [];
  filterapplied:boolean = false;
  isLoading: boolean = false;

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
          this.listofdocuments.push(obj);
        })
        console.log(this.listofdocuments);
        this.isLoading = false;    
      })
      
    })
    
    
  }

  search(Form:NgForm){
    if(Form.valid){
      const val = Form.value.search;
      this.filterapplied = true;
      this.filteredlistofdocuments = this.listofdocuments.filter((document)=>{
        return (document['name'].includes(val))
      })
    }
  }

  clear(Form: NgForm){
    this.filterapplied = false;
    this.filteredlistofdocuments = [];
    Form.reset();
  }

}
