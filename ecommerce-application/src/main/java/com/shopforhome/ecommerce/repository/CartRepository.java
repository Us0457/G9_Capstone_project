package com.shopforhome.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopforhome.ecommerce.model.Cart;
import com.shopforhome.ecommerce.model.User;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    List<Cart> findAllByUserOrderByCreatedDateDesc(User user);
}
