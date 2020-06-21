import { Component } from "@angular/core";
import { CompanyHttpService } from 'src/app/services/http-services/company-http-service';
import Company from 'src/app/models/company';
import CreateCompanyRequest from 'src/app/models/request-models/create-company-request';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-company',
  templateUrl: 'create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent {
  
  companyName: string;
  companyEmail: string;
  companyPhoneNumber: string;

  constructor(
    private companyService: CompanyHttpService,
    private authService: AuthService
  ) { }
  
  onCreate(): void {
    const createRequest = new CreateCompanyRequest();
    createRequest.email = this.companyEmail;
    createRequest.name = this.companyName;
    createRequest.phoneNumber = this.companyPhoneNumber;
    createRequest.ownerName = this.authService.getUserName();

    this.companyService.createCompany(createRequest).subscribe((company: Company) => {
      console.log(company);
    });
  }

}