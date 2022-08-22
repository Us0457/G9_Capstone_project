package com.shopforhome.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.shopforhome.ecommerce.dto.ProductDto;
import com.shopforhome.ecommerce.exceptions.CustomException;
import com.shopforhome.ecommerce.model.Cart;
import com.shopforhome.ecommerce.model.User;
import com.shopforhome.ecommerce.model.WishList;
import com.shopforhome.ecommerce.repository.WishListRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WishListService {

    @Autowired
    WishListRepository wishListRepository;

    @Autowired
    ProductService productService;

    public void createWishlist(WishList wishList) {
        wishListRepository.save(wishList);
    }

    public List<ProductDto> getWishListForUser(User user) {
        final List<WishList> wishLists = wishListRepository.findAllByUserOrderByCreatedDateDesc(user);
        List<ProductDto> productDtos = new ArrayList<>();
        for (WishList wishList: wishLists) {
            productDtos.add(productService.getProductDto(wishList.getProduct()));
        }

        return productDtos;
    }
    
    public void deleteWishlistItem(Integer productId, User user) {
    	Optional<WishList> optionalWishlist = wishListRepository.findById(productId);

        if (optionalWishlist.isEmpty()) {
            throw new CustomException("Wishlist item id is invalid: " + productId);
        }

        WishList wish = optionalWishlist.get();

        if (wish.getUser() != user) {
            throw  new CustomException("Wishlist item does not belong to user: " +productId);
        }

        wishListRepository.delete(wish);
    }
}
