import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../model/Product';
import { HttpClientService } from '../../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  ImgSelected: boolean=false;
  ImageSrc: string;
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File; // Variable to store file

 
  @Input()
  product: Product;

 
  @Output()
  productAddedEvent = new EventEmitter();
  dialog: any;
  selectedFile: any;

 constructor(private httpClientService: HttpClientService,
   private activedRoute: ActivatedRoute,
   private router: Router,
   private fileUploadService: FileUploadService,
   private httpClient: HttpClient,
   public dialogb : MatDialog,
   private toastr : ToastrService) { }
   
 ngOnInit() {
 }

//  handleProduct(){
//   if(this.product.name==null){
//     this.saveProduct();
//   }
//   else{
//     this.updateProduct();
//   }
//  }

 saveProduct(){
     this.product.imageURL=this.ImageSrc;
     console.log(this.product.imageURL);
     this.httpClientService.addProduct(this.product).subscribe({
      next: () =>{
        this.toastr.success('Product saved to database');
        this.productAddedEvent.emit();
        this.router.navigate(['admin', 'products']);
      },
      error: () =>{
        this.toastr.error('Failed to save product');
      },
     })
    }
    //    (next) => {
    //      this.toastr.success('Product saved to database');
    //      this.productAddedEvent.emit();
    //      this.router.navigate(['admin', 'products']);
    //    },
    //    (_error) =>{
    //      this.toastr.error('Failed to save product');
    //    }
    //  );   
//    }else {
//     this.updateProduct();
//    }
//  }

 updateProduct(){
  this.product.imageURL=this.ImageSrc;
  this.httpClientService.updateProduct(this.product).subscribe(
    (product) => {
      this.toastr.success('Product updated successfully');
      this.productAddedEvent.emit();
      this.router.navigate(['admin', 'products']);
    }
  );
 }

 onChange(event:any) {
   this.file = event.target.files[0];
 }

 onUpload() {
   this.loading = !this.loading;
   console.log(this.file);
   this.fileUploadService.upload(this.file).subscribe(
       (event: any) => {
           if (typeof (event) === 'object') {
            this.toastr.error('Products CSV uploaded!');
            this.loading = false;
           }
       }
   );
 }
 openDialogbox(){
   let dialogBox = this.dialogb.open(ImageSelectorComponent,{
     width: "800px",
     height: "500px"
   })
   dialogBox.afterClosed().subscribe(result => {
     this.ImageSrc = result;
     this.ImgSelected = true;
   });
 }
 
}
