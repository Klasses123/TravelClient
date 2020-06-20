import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isLoggedIn: boolean;

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  onMainPage(): void {
    this.router.navigate(['/'])
  }

  onLogin(): void {
    this.router.navigate(['/login'])
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }
}