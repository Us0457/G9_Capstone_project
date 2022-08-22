import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist:any

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.wishlistService.getWishlist()
    .subscribe((res=>{
      this.wishlist=res;
    }))
  }

  removeItem(){
    
  }

}
