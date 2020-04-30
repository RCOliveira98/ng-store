import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Header } from './header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _elHeader = new BehaviorSubject<Header>({
    title: 'Início',
    icon: 'home',
    url: ''
  });

  constructor() { }

  get elHeader(): Header {
    return this._elHeader.value;
  }

  set elHeader(header: Header) {
    this._elHeader.next(header);
  }
}
