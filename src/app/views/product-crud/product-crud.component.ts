import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from './../../components/template/header/header.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  constructor(private servRouter: Router, private header: HeaderService) {
    this.header.elHeader = {title: 'Produtos', icon: 'storefront', url: '/products'};
   }

  ngOnInit() {
  }

  navigateToNewProduct(): void {
    this.servRouter.navigate(['/products/create']);
  }

}
