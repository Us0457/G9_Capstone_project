import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { HttpClientService } from '../../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  ImgSelected: boolean=false;
  ImageSrc: string;
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File; // Variable to store file

 
  @Input()
  category: Category;

 
  @Output()
  categoryAddedEvent = new EventEmitter();
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

//  handlecategory(){
//   if(this.category.name==null){
//     this.savecategory();
//   }
//   else{
//     this.updatecategory();
//   }
//  }

 saveCategory(){
     this.category.imageUrl=this.ImageSrc;
     console.log(this.category.imageUrl);
     this.httpClientService.addCategory(this.category).subscribe({
      next: () =>{
        this.toastr.success('Category saved to database');
        this.categoryAddedEvent.emit();
        this.router.navigate(['admin', 'categories']);
      },
      error: () =>{
        this.toastr.error('Failed to save category');
      },
     })
    }


//  updateCategory(){
//   this.category.imageUrl=this.ImageSrc;
//   this.httpClientService.updateCategory(this.category).subscribe(
//     (category) => {
//       this.toastr.success('category updated successfully');
//       this.categoryAddedEvent.emit();
//       this.router.navigate(['admin', 'categorys']);
//     }
//   );
//  }

 onChange(event:any) {
   this.file = event.target.files[0];
 }

 onUpload() {
   this.loading = !this.loading;
   console.log(this.file);
   this.fileUploadService.upload(this.file).subscribe(
       (event: any) => {
           if (typeof (event) === 'object') {
            this.toastr.error('categorys CSV uploaded!');
            this.loading = false;
           }
       }
   );
 }
 openDialogbox(){
   let dialogBox = this.dialogb.open(CategorySelectorComponent,{
     width: "800px",
     height: "500px"
   })
   dialogBox.afterClosed().subscribe(result => {
     this.ImageSrc = result;
     this.ImgSelected = true;
   });
 }
}
