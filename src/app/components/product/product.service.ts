import { baseUrl } from './../../shared/baseUrl';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from './product-model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
    ) { }

  /**
   * Criar uma mensagem no estilo toast
   *
   * @param {string} msg conteúdo da mensagem
   * @memberof ProductService
   */
  createToast(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${baseUrl}/products`, product);
  }
}
