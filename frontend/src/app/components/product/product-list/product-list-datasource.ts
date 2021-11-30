import { Product } from './../product.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
// import { ProductService } from './../product.service';
// import { ProductReadComponent } from '../product-read/product-read.component';


const BOOK_DATA: Product[] = [
  {id: 1, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 2, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 3, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 4, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 5, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 6, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 7, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 8, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 9, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 10, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 11, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079},
  {id: 12, title: 'Title', author: 'author', language: 'Portugues', url: 'URL DO LIVRO', imgCover: 'No Image', price: 1.0079}

];

export class ProductListDataSource extends DataSource<Product> {
  data: Product[] = BOOK_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  connect(): Observable<Product[]> {
    if (this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private getPagedData(data: Product[]): Product[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        case 'author': return compare(+a.author, +b.author, isAsc);
        case 'language': return compare(+a.language, +b.language, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
