import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  isLoggedIn$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isLoggedIn$ = this.authService.loggedIn.subscribe((res: boolean) => {
      this.isLoggedIn = res;
    });
  }

  ngOnDestroy(): void {
    this.isLoggedIn$.unsubscribe();
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

  onProfile(): void {
    this.router.navigate(['/profile']);
  }
}