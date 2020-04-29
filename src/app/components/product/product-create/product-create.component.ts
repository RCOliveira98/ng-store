import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from './../product.service';

import { Product } from '../product-model';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {

  product: Product = {title: null, price: null};
  inscricao: Subscription;

  constructor(
    private servProduct: ProductService,
    private servRouter: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }

  createProduct(): void {
    this.inscricao = this.servProduct.createProduct(this.product).subscribe(
      (success: Product) => {
        this.servProduct.createToast('Produto criado com sucesso!');
        this.navigate();
      });
  }

  close() {
    this.navigate();
  }

  private navigate(): void {
    this.servRouter.navigate(['/products']);
  }

}
