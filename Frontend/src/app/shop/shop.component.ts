import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../service/cart.service';
import { HttpClientService } from '../service/http-client.service';
import { WishlistService } from '../service/wishlist.service';
import { WishlistComponent } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  addedToWishlist:boolean = false;
  searchKey:string="";
  public searchTerm : string = '';
  public productList : any;
  public filterCategory : any;
  public productListReceived : any;
  public imageList : any;
  isSelected:boolean = false;
  clicked = false;

  constructor(
    private cartService:CartService,
    private wishlistService: WishlistService,
    private httpClientService: HttpClientService, 
    private toastr: ToastrService) { } 

  ngOnInit(): void {
      this.httpClientService.getProducts()
      .subscribe(res=>{
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a:any) => {
          if(a.category === "men's clothing" || a.category === "women's clothing"){
            a.category = "fashion"
          }
        });
      })
      this.httpClientService.search.subscribe((val:any)=>{
        this.searchKey = val;
      })  
  }
  addtoCart(cartProductObj:any){
    var cartObj = {
      "productId":cartProductObj.id,
      "quantity":cartProductObj.quantity,
    }
    this.cartService.addCart(cartObj);
    this.toastr.success('Added to Cart!');
    this.isSelected = true;
  }

  removeCartItem(cartItem:any){
    var cartObj = {
      "cartItemId": cartItem.id
    }
    this.cartService.removefromCart(cartObj);
    this.toastr.warning('Removed from Cart!');
  }
  addtoWishlist(Product:any){
    this.clicked = true;
    this.wishlistService.addtoWish(Product);
    this.toastr.success('Added to Wishlist!');
  }


  filter(categoryName:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if (a.category == categoryName ||  categoryName==''){
        return a;
      }
    })
  }
  filterCategoryId(id:any){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if (a.categoryId == id ||  id==''){
        return a;
      }
    })
  }

  filterprice(price:number){
    this.filterCategory = this.productList
    .filter((a:any) =>{
      if(a.price <= price){
        return a;
      }
    })
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value; 
    console.log(this.searchTerm);
    this.httpClientService.search.next(this.searchTerm);
  }
}