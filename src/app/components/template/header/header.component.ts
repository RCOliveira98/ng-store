import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private servHeader: HeaderService, private router: Router) { }

  ngOnInit() {
  }

  get title(): string {
    return this.servHeader.elHeader.title;
  }

  get icon(): string {
    return this.servHeader.elHeader.icon;
  }

  get url(): string {
    return this.servHeader.elHeader.url;
  }

  headerNavigate() {
    this.router.navigate([this.url]);
  }

}
