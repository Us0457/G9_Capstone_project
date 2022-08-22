import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { Product } from '../model/Product';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  public search = new BehaviorSubject<string>("");

  constructor(
    private httpClient:HttpClient
  ) { }

  // getUsers(){
  //   return this.httpClient.get<User[]>('http://localhost:8080/customer/users');
  // }

  // addUser(newUser: User) {
  //   return this.httpClient.post<User>('http://localhost:8080/customer/addUser', newUser);   
  // }

  // deleteUser(id:any) {
  //   return this.httpClient.delete<User>('http://localhost:8080/customer/user/' + id);
  // }

  // getProduct() {
  //   return this.httpClient.get<Product[]>('http://localhost:8080/products/get');
  // }

  // addProduct(newProduct: Product) {
  //   return this.httpClient.post<Product>('http://localhost:8080/products/add', newProduct);
  // }

  // deleteProduct(id:any) {
  //   return this.httpClient.delete<Product>('http://localhost:8080/products/' + id);
  // }

  // updateProduct(updatedProduct: Product) {
  //   return this.httpClient.put<Product>('http://localhost:8080/products/update', updatedProduct);
  // }

// Newly added function for products using csv
  getProducts(){
    return this.httpClient.get<any>("http://localhost:8080/product/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getImages(){
    return this. httpClient.get<any>("http://localhost:8080/files")
    .pipe(map((resp:any) => {
      return resp;
    }))
  }
  getProduct() {
    return this.httpClient.get<Product[]>('http://localhost:8080/product/');
  }

  addProduct(newProduct: Product) {
    return this.httpClient.post<Product>('http://localhost:8080/product/add', newProduct);
  }

  deleteProduct(id:any) {
    return this.httpClient.delete<Product>('http://localhost:8080/products/' + id);
  }

  updateProduct(updatedProduct: Product) {
    return this.httpClient.put<Product>('http://localhost:8080/products/update', updatedProduct);
  }

  getUsers(){
    return this.httpClient.get<User[]>('http://localhost:8080/user/get');
  }

  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8080/user/signup', newUser);   
  }

  deleteUser(id:any) {
    return this.httpClient.delete<User>('http://localhost:8080/customer/user/' + id);
  }

  getCategory(){
    return this.httpClient.get<Category[]>('http://localhost:8080/catgory/list');
  }

  addCategory(newCategory:Category){
    return this.httpClient.post<Category>('http://localhost:8080/catgory/create', newCategory);
  }

  updateCategory(updatedCategory:Category, id:any){
    return this.httpClient.post<Category>('http://localhost:8080/catgory/update/' +id , updatedCategory);
  }

  deleteCategory(id:any){
    return this.httpClient.delete<Category>('http://localhost:8080/catgory/update/' +id )
  }

  sendMail(recipient:string, msgBody:string, subject:string){
    var data ={
      "recipient":recipient,
      "msgBody":msgBody,
      "subject":subject
    }
    return this.httpClient.post<any>("http://localhost:8080/sendMail", data)
    .subscribe((res=>{
      console.log(res);
    }));
  }
}
