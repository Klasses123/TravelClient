import { Component } from "@angular/core";
import { CompanyHttpService } from 'src/app/services/http-services/company-http-service';
import Company from 'src/app/models/company';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/services/http-services/user-http-service';

@Component({
  selector: 'admin-company',
  templateUrl: 'administrate-company.component.html',
  styleUrls: ['administrate-company.component.scss']
})
export class AdministrateCompanyComponent {
  
  company: Company = new Company();
  canCreateTravel: boolean = false;
  isOwner: boolean = false;

  constructor(
    private companyService: CompanyHttpService,
    private authService: AuthService,
    private router: Router,
    private userService: UserHttpService
  ) {
    companyService.getCompany(this.authService.getCompanyName())
      .subscribe((cmpny) => {
        this.company = cmpny;
      });

    userService.canCreateTravel()
      .subscribe((res) => {
        this.canCreateTravel = res;
      });

    userService.isOwner()
      .subscribe((res) => {
        this.isOwner = res;
      })
  }

  createTravel(): void {
    this.router.navigate(['create-travel']);
  }

  removeCompany(): void {
    this.companyService.deleteCompany(this.authService.getCompanyName())
      .subscribe((res) => {
        console.log(res);
      });
  }
}