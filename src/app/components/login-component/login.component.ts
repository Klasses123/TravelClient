import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  userName: string;
  password: string;

  constructor(
    public authService: AuthService
  ) {}

  login() {
    this.authService.login(this.userName, this.password);
  }
}