import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  object:any;
  private baseUrl: string = 'http://localhost:8080/wishlist/';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenStorageService
  ) { }

  getWishlist(){
    const token = this.tokenService.getToken();
    const searchUrl = `${this.baseUrl}${token}`;
    return this.httpClient.get<any>(searchUrl)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  addtoWish(Product:any){
    // var request = {
    //   "description":obj.description,
    //   "id":obj.categoryId,
    //   "imageURL":obj.imageURL,
    //   "name":obj.name,
    //   "price":obj.price
    // }
    const token = this.tokenService.getToken();
    const searchUrl = `${this.baseUrl}add?token=${token}`
    return this.httpClient.post<any>(searchUrl, Product)
    .subscribe((res=>{
      this.object=res;
      console.log(this.object);
    }))
  }
}
