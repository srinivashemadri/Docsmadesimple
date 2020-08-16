import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Docsmadesimple';
  user:object = null;
  ngOnInit(){
    this.auth.authState.subscribe((user)=>{
      this.user = user;
      

    })

  }
  constructor(private auth: AngularFireAuth, private router: Router){


  }

  logout(){
    this.auth.auth.signOut().then(()=>{
      var modaltrigger = document.getElementById('logoutmodaltrigger');
         
      this.router.navigate(['/home']);
    });

  }
}
