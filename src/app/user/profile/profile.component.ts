import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AngularFireAuth) { }

  user:object;
  authorized:boolean
  loading:boolean;
  ngOnInit() {
    this.loading = true;
    this.auth.authState.subscribe((use)=>{
      this.loading = false;
      this.user = use;
      console.log(this.user['photoURL'])
      this.authorized = this.user == null ? false : true
      
    })
  }

}
