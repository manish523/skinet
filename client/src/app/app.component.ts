import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/models/pagination';
import { IProduct } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  // products: IProduct[];

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  // this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe(
  //   (response: IPagination) => {
  //     this.products = response.data;
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
  // }

  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(
        () => {
          console.log('loaded user');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  loadBasket() {
    const basketID = localStorage.getItem('basket_id');
    if (basketID) {
      this.basketService.getBasket(basketID).subscribe(
        () => {
          console.log('initialized basket');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
