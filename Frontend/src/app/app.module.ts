import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './admin/products/products.component';
import { AddproductComponent } from './admin/products/addproduct/addproduct.component';
import { ViewproductComponent } from './admin/products/viewproduct/viewproduct.component';
import { UsersComponent } from './admin/users/users.component';
import { AdduserComponent } from './admin/users/adduser/adduser.component';
import { ViewuserComponent } from './admin/users/viewuser/viewuser.component';
import { ImageSelectorComponent } from './admin/products/addproduct/image-selector/image-selector.component';
import { ShopComponent } from './shop/shop.component';
import { FilterPipe } from './shared/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddcategoryComponent } from './admin/category/addcategory/addcategory.component';
import { ViewcategoryComponent } from './admin/category/viewcategory/viewcategory.component';
import { CategorySelectorComponent } from './admin/category/addcategory/category-selector/category-selector.component';
import { EmailSenderComponent } from './admin/products/addproduct/email-sender/email-sender.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AddproductComponent,
    ViewproductComponent,
    UsersComponent,
    AdduserComponent,
    ViewuserComponent,
    ImageSelectorComponent,
    ShopComponent,
    FilterPipe,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    WishlistComponent,
    CartComponent,
    CategoryComponent,
    AddcategoryComponent,
    ViewcategoryComponent,
    CategorySelectorComponent,
    EmailSenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    ToastrModule.forRoot(),
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
