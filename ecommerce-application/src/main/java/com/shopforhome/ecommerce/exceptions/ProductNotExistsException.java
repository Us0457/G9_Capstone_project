package com.shopforhome.ecommerce.exceptions;

public class ProductNotExistsException extends IllegalArgumentException {
    public ProductNotExistsException(String msg) {
        super(msg);
    }
}