import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { HttpClientService } from 'src/app/service/http-client.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Array<Category>;
  categoriesRecieved: Array<Category>;
  action: string;
  selectedCategory: Category | any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData()
   {
    this.httpClientService.getCategory().subscribe(
      (response: any) => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const id = params['id'];
        if (id) {
          this.selectedCategory = this.categories.find(category => {
            return category.id === +id;
          });
        }
      }
    );
   }

  handleSuccessfulResponse(response:any) {
    this.categories = new Array<Category>();
    this.categoriesRecieved = response;
    for (const category of this.categoriesRecieved) {
      const categorywithRetrievedImageField = new Category();
      categorywithRetrievedImageField.id = category.id;
      categorywithRetrievedImageField.categoryName = category.categoryName;
      categorywithRetrievedImageField.imageUrl = category.imageUrl;
      categorywithRetrievedImageField.description = category.description;
      this.categories.push(categorywithRetrievedImageField);
    }
  }

  addcategory() {
    this.selectedCategory = new Category();
    this.router.navigate(['admin', 'category'], { queryParams: { action: 'add' } });
  }

  viewcategory(id: number) {
    this.router.navigate(['admin', 'category'], { queryParams: { id, action: 'view' } });
  }

}
