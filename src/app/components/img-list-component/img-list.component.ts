import { Component, OnInit } from '@angular/core';
import ImgListItem from 'src/app/models/img-list-item';

@Component({
    selector: 'app-img-list',
    templateUrl: 'img-list.component.html',
    styleUrls: ['img-list.component.scss']
})

export class ImgListComponent implements OnInit {
    constructor() { }

    //TODO add post request here for travel's images ppp
    images: ImgListItem[] = [
        {url: 'http://www.planetware.com/photos-large/MAR/morocco-casablanca-hassan-ii-mosque-facade.jpg', title: 'First'},
        {url: 'https://www.desertmoroccoadventure.com/wp-content/uploads/2015/07/fez-fes-Morocco.png', title: 'Second'}
    ];

    ngOnInit() { }
}