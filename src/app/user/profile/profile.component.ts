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
  ngOnInit() {
    this.auth.authState.subscribe((use)=>{
      this.user = use;
      console.log(this.user['photoURL'])
      
    })
  }

}
