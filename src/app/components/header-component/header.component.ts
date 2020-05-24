import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

export class HeaderComponent implements OnInit {
  constructor() { }

  //TODO add some here
  references: any[] = [{
      title: 'Главная',
      onClick() {
        console.log('router to main page');
      }
    }, {
      title: 'Не главная',
      onClick() {
        console.log('router to other page');
      }
    }
  ];

  ngOnInit() { }
}