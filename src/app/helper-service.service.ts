import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  private _cantidadbuenas = new BehaviorSubject<string>('');
  constructor() { }
  public mandarCantidad = this._cantidadbuenas.asObservable();
  public modificarCantidad(_cant : string):void{
    this._cantidadbuenas.next(_cant);
  }
}

