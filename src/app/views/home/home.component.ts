import { Header } from './../../components/template/header/header.model';
import { Component, OnInit } from '@angular/core';

import { HeaderService } from './../../components/template/header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private header: HeaderService) {
    this.header.elHeader = {title: 'Início', icon: 'home', url: '/'};
   }

  ngOnInit() {
  }

}
