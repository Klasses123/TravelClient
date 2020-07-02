import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { UserHttpService } from 'src/app/services/http-services/user-http-service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  
  user: User = new User();

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserHttpService
  ) {}

  ngOnInit(): void{
    this.userService.getUserByUserName(this.authService.getUserName())
      .subscribe((u) => {
        this.user = u;
      });
  }

  ngOnDestroy(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  createCompany(): void {
    this.router.navigate(['create-company']);
  }

  administrateCompany(): void {
    this.router.navigate(['admin-company'])
  }
}
