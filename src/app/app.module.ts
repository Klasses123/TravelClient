import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header-component/header.component';
import { ImgListComponent } from './components/img-list-component/img-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login-component/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpIntercept } from './services/http-interceptor';
import { ToastModule } from './components/shared/toast/toast.module';
import { RegisterComponent } from './components/register-component/register.component';
import { ProfileComponent } from './components/profile-component/profile.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { AdministrateCompanyComponent } from './components/administrate-company/administrate-company.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImgListComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CreateCompanyComponent,
    AdministrateCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercept,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
