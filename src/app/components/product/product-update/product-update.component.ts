import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit, OnDestroy {

  product: Product;
  subscription: Subscription;

  constructor(
    private servProduct: ProductService,
    private servRouter: Router,
    private servActivetedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fillProduct();
  }

  ngOnDestroy(): void {
    this.servProduct.unsubscribe(this.subscription);
  }

  update(): void {
    try {
      this.servProduct.unsubscribe(this.subscription);

      this.servProduct.updateProduct(this.product).subscribe(
        success => {
          this.servProduct.createToast('Produto atualizado com sucesso!');
          this.reditectUrl();
        },
        erro => this.servProduct.createToast(`Falha ao atualizar o produto! ${erro}`)
      );
    } catch (error) {
      this.servProduct.createToast();
    }
  }

  cancel() {
    this.reditectUrl();
  }

  private reditectUrl(): void {
    this.servRouter.navigate(['/products']);
  }

  private fillProduct(): void {
    try {
      this.servProduct.unsubscribe(this.subscription);
      const id = this.servActivetedRoute.snapshot.paramMap.get('id');
      this.subscription = this.servProduct.readProductById(Number(id)).subscribe(
        (product: Product) => this.product = product,
        erro => this.servProduct.createToast(`Falha ao carregar dados do produto. ${erro}`)
      );
    } catch (error) {
      this.servProduct.createToast('Falha inesperada! Contate nossa equipe.');
    }
  }

}
