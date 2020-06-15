import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public http: HttpClient
  ){}
  title = 'Traveling';
  

  async requestG() {
    console.log(await this.http.delete('https://localhost:44315/user/delete/71ccfaca-dbcb-4870-b0f8-70da1195094a').toPromise())
  }

  async request() {
    console.log(await this.http.post('https://localhost:44315/user/create', {
      login: "asdZXCzxc",
      email: "mail1@mail.ru",
      firstName: "name",
      lastName: "name",
      password: "010203Qwe",
      registredOn: "01.03.2012"
    }).toPromise())
  }

  async getTokens() {
    console.log(await this.http.post('https://localhost:44315/api/Token/Login', {
      userName: "asdZXCzxc",
      password: "010203Qwe"
    }).toPromise())
  }
}
