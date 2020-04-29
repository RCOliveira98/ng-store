import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from './../product.service';

import { Product } from './../product-model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit, OnDestroy {

  productsList: Product[];
  subscription: Subscription;
  displayedColumns: string[] = ['ID', 'NOME', 'PREÇO', 'AÇÕES'];

  constructor(
    private servProduct: ProductService,
    private servRouter: Router
    ) { }

  ngOnInit() {
    this.fillList();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  redirectToUpdate(id: number) {
    this.servRouter.navigate([`/products/update/${id}`]);
  }

  delete(id: number): void {
    this.servProduct.unsubscribe(this.subscription);

    this.subscription = this.servProduct.deleteProduct(id).subscribe(
      success => {
        this.fillList();
        this.servProduct.createToast('Produto excluído com sucesso!');
      }
    );
  }

  private fillList(): void {
    this.servProduct.unsubscribe(this.subscription);

    this.subscription = this.servProduct.readProducts().subscribe(
      (products: Product[]) => this.productsList = products);
  }

}
