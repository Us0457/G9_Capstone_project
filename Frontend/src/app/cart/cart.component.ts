import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cartList:any;
  constructor(
    private router: Router,
    private cartService: CartService  ) { }

  ngOnInit(): void {
    this.cartService.getCart()
    .subscribe(res=>{
      this.cartList = res;
      console.log(this.cartList);
    })
  }

  removeCartItem(cartItem:any){
    var cartObj = {
      "cartItemId": cartItem.id
    }
    this.cartService.removefromCart(cartObj);
    this.router.navigate(['/cart'])
    .then(() => {
      window.location.reload();
    });
  }
  
}
