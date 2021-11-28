import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API_PRODUCTS = `${environment.API}/products`;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
    ) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack-bar-success'
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API_PRODUCTS}`, product);
  }

}
