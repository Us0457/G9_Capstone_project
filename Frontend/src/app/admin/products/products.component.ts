import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';
import { EmailSenderComponent } from './addproduct/email-sender/email-sender.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<Product>;
  productsRecieved: Array<Product>;
  action: string;
  selectedProduct: Product | any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    public dialogb : MatDialog,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData()
   {
    this.httpClientService.getProduct().subscribe(
      (response: any) => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const id = params['id'];
        if (id) {
          this.selectedProduct = this.products.find(product => {
            return product.id === +id;
          });
        }
      }
    );
   }

  handleSuccessfulResponse(response:any) {
    this.products = new Array<Product>();
    this.productsRecieved = response;
    for (const product of this.productsRecieved) {
      const productwithRetrievedImageField = new Product();
      productwithRetrievedImageField.id = product.id;
      productwithRetrievedImageField.name = product.name;
      productwithRetrievedImageField.retrievedImage = product.imageURL;
      productwithRetrievedImageField.categoryId = product.categoryId;
      productwithRetrievedImageField.description = product.description;
      productwithRetrievedImageField.price = product.price;
      productwithRetrievedImageField.imageURL=product.imageURL;
      this.products.push(productwithRetrievedImageField);
    }
  }

   addProduct() {
    this.selectedProduct = new Product();
    this.router.navigate(['admin', 'products'], { queryParams: { action: 'add' } });
  }

  viewProduct(id: number) {
    this.router.navigate(['admin', 'products'], { queryParams: { id, action: 'view' } });
  }

  openDialogbox(){
    let dialogBox = this.dialogb.open(EmailSenderComponent,{
      width: "800px",
      height: "500px"
    })
    dialogBox.afterClosed().subscribe(result => {
    });
  }
}

