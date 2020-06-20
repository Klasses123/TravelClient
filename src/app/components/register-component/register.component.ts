import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import User from 'src/app/models/user';
import { UserHttpService } from 'src/app/services/http-services/user-http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  email: string;
  userName: string;
  password: string;
  passRepeat: string;
  firstName: string;
  lastName: string;

  incorrectPassMessage: string;

  get containLowerCase(): boolean {
    return /[a-zа-яё]/.test(this.password);
  }

  get containUpperCase(): boolean {
    return /[A-ZА-ЯЁ]/.test(this.password);
  }

  get containDigit(): boolean {
    return /\d/.test(this.password);
  }

  constructor(
    private authService: AuthService,
    private userService: UserHttpService,
    private router: Router
  ) {}

  register(): void {
    if (!this.containLowerCase && !this.containUpperCase) {
      this.incorrectPassMessage = 
        'Пароль должен содержать хотя бы 1 буквку латинского алфавита';
      return;
    }
    if (!this.containDigit) {
      this.incorrectPassMessage = 
        'Пароль должен содержать хотя бы 1 цифру';
      return;
    }

    const user = new User();
    user.email = this.email;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.login = this.userName;
    user.password = this.password;

    this.userService.createUser(user).subscribe(
      (u) => {
        this.authService.login(u.login, this.password);
        this.router.navigate(['/']);
      }
    )
  }
}