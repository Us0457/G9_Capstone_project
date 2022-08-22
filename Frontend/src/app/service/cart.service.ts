import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Product } from '../model/Product'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem: [] | any;
  object: any;
  url = "http://localhost:8080/";

  private baseUrl: string = 'http://localhost:8080/cart/';


  constructor(
    private httpClient:HttpClient,
    private tokenService:TokenStorageService) { }
    
  addCart(obj:any){
    var request = {
      "productId":obj.productId,
      "quantity":obj.quantity
    }
    const token = this.tokenService.getToken();
    const searchUrl = `${this.baseUrl}add?token=${token}`
    return this.httpClient.post<any>(searchUrl, request)
    .subscribe((res=>{
      this.object=res;
      console.log(this.object);
    }))
  }

  getCart(){
    const token = this.tokenService.getToken();
    const searchUrl = `${this.baseUrl}?token=${token}`;
    return this.httpClient.get<any>(searchUrl)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  removefromCart(obj:any){
    var request = {
      "cartItemId": obj.cartItemId
    }
    const token = this.tokenService.getToken();
    const searchUrl = `${this.baseUrl}delete/${obj.cartItemId}?token=${token}`;
    return this.httpClient.delete<any>(searchUrl)
    .subscribe((res=>{
      console.log(res);
    }))
  }
}
