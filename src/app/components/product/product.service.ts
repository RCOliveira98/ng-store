import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subscription, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { baseUrl } from './../../shared/baseUrl';

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
  createToast(msg: string = 'Falha inesperada! Contate nossa equipe.', isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  /**
   * Se comunica com a API e cria um novo produto.
   *
   * @param {Product} product Objeto a ser criado
   * @returns {Observable<Product>} objeto recém criado
   * @memberof ProductService
   */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${baseUrl}/products`, product)
    .pipe(
      map(obj => obj),
      catchError(e => this.treatmentErrors(e, 'Falha ao cadastrar novo produto!'))
    );
  }

  /**
   * Se comunica com a API e retorna todos os produtos cadastrados.
   *
   * @returns {Observable<Product[]>} Array de objetos Produtos.
   * @memberof ProductService
   */
  readProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/products`)
    .pipe(
      map(obj => obj),
      catchError(e => this.treatmentErrors(e, 'Falha ao carregar os produtos cadastrados!'))
    );
  }

  /**
   * Comunica-se com API e retorna os dados de um dado objeto
   * produto de acordo com o ID informado.
   *
   * @param {number} id código identificador utilizado para a busca
   * @returns {Observable<Product>} produto encontrado
   * @memberof ProductService
   */
  readProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/products/${id}`)
    .pipe(
      map(obj => obj),
      catchError(e => this.treatmentErrors(e, 'Falha ao carregar dados do produto informado!'))
    );
  }

  /**
   * Comunica-se com a API e atualiza os dados de
   * um dado produto.
   *
   * @param {Product} product produto a ser atualizado
   * @returns {Observable<Product>} produto recém atualizado
   * @memberof ProductService
   */
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${baseUrl}/products/${product.id}`, product)
    .pipe(
      map(obj => obj),
      catchError(e => this.treatmentErrors(e, 'Falha ao atualizar o produto informado!'))
    );
  }

  /**
   * Comunica-se com a API e deleta o produto desejado.
   *
   * @param {number} id referência ao produto a ser apagado
   * @returns {Observable<any>}
   * @memberof ProductService
   */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/products/${id}`)
    .pipe(
      map(obj => obj),
      catchError(e => this.treatmentErrors(e, 'Falha ao excluir o produto informado!'))
    );
  }

  /**
   * Remove inscrição em um dado objeto subscription
   *
   * @param {Subscription} subscription objeto a ter a inscrição cancelada
   * @memberof ProductService
   */
  unsubscribe(subscription: Subscription): void {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  private treatmentErrors(e: any, msg?: string): Observable<any> {
    console.error(e);
    this.createToast(msg, true);
    return EMPTY;
  }
}
