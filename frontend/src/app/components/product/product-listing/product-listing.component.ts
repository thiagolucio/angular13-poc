import { ProductListingDataSource } from './product-listing-datasource';
import { ProductService } from '../product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product.model';
import { DataSource } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductListingDataSource;

  products: Product[] = [];
  displayedColumns = ['id', 'title', 'author','language', 'url', 'imgCover', 'price', 'action'];

  constructor(private productService: ProductService) {
    this.dataSource = new ProductListingDataSource(this.productService);
  }

  ngOnInit(): void {
    //bringing products from service using subscribe
    this.productService.read().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  // pagination(): void {
  //   let page5 =
  // }

}
