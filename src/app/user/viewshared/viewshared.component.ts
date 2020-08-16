import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-viewshared',
  templateUrl: './viewshared.component.html',
  styleUrls: ['./viewshared.component.css']
})
export class ViewsharedComponent implements OnInit {

  constructor(private db: AngularFirestore) { }
  email:string ='';
  id: string='';
  data:object;
  isLoading:boolean;
  ngOnInit() {
    
    this.email= (window.location.pathname.split('/')[2]);
    this.id= (window.location.pathname.split('/')[3]);
    this.isLoading = true;
    this.db.collection("users").doc(this.email).collection("documents").doc(this.id).get().subscribe((result)=>{
      this.isLoading = false;
      this.data = result.data();
      console.log(this.data)
      console.log(this.data['switch'])
    })
  }

}
