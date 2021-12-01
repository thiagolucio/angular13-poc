import { Product } from './../product.model';
import { Router } from '@angular/router';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})

export class ProductCreateComponent implements OnInit {

  product: Product = {
    id: 2,
    title: '',
    author: '',
    language: '',
    url: '',
    imgCover: '',
    price: 0
  }

  constructor (
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Product created successfully!');
      this.router.navigate(['/products']);
    });
  }

  cancelCreateProduct(): void {
    this.router.navigate(['/products']);
  }

}
