import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewshared',
  templateUrl: './viewshared.component.html',
  styleUrls: ['./viewshared.component.css']
})
export class ViewsharedComponent implements OnInit {

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, public ds: DataService, private router: Router) { }
  email:string ='';
  id: string='';
  data:object;
  isLoading:boolean;
  user;
  async ngOnInit() {

    this.isLoading = true;
    this.auth.authState.subscribe((user)=>{
      this.user = user;
    })
    this.email= (window.location.pathname.split('/')[2]);
    this.id= (window.location.pathname.split('/')[3]);
    
    this.db.collection("users").doc(this.email).collection("documents").doc(this.id).get().subscribe((result)=>{
      this.isLoading = false;
      this.data = result.data();
      console.log(this.data)
      console.log(this.data['switch'])
    })
  }

  update(){
    this.data['id'] = (window.location.pathname.split('/')[3]);
    this.ds.writeDocument(this.data);
    this.router.navigate(['/uploadnewdocument']);

  }

}
