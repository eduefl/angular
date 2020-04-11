import { Component, OnInit } from '@angular/core';

import { Usuario } from './usuario';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _usuario: Usuario = new Usuario();

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  fazerLogin(){

//    console.log(this._usuario);
      this._authService.fazerlogin(this._usuario);



  }

}
