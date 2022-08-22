import { Component, OnInit, Input,EventEmitter, Output} from '@angular/core';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {

  
  @Input()
  category: Category;

  @Output()
  categoryDeletedEvent = new EventEmitter();


  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit() {
  }

  deleteCategory() {
    this.httpClientService.deleteCategory(this.category.id).subscribe(
      (category) => {
        this.categoryDeletedEvent.emit();
        this.router.navigate(['admin', 'category']);
      }
    );
  }

  editcategory() {
    this.router.navigate(['admin', 'category'], { queryParams: { action: 'edit', id: this.category.id } });
  }


}
