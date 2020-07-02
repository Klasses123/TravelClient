import { Component } from "@angular/core";
import { CompanyHttpService } from 'src/app/services/http-services/company-http-service';
import Company from 'src/app/models/company';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'admin-company',
  templateUrl: 'administrate-company.component.html',
  styleUrls: ['administrate-company.component.scss']
})
export class AdministrateCompanyComponent {
  
  company: Company = new Company();

  constructor(
    private companyService: CompanyHttpService,
    private authService: AuthService
  ) {
    companyService.getCompany(this.authService.getCompanyName())
      .subscribe((cmpny) => {
        this.company = cmpny;
      });
  }
}