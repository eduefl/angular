import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  mostrarMenu: boolean = false;
  usercanedit: boolean = false;

  constructor(private _authService : AuthService){


  
  
  }

  ngOnInit(): void {
    this._authService.mostrarMenu.subscribe(
      show => this.mostrarMenu = show 
    );


    

    
    
  }




}
