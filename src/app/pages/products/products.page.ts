import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsPage implements OnInit {
  items = [
    { icon: 'pricetag', name: 'All products' },
    { icon: 'storefront', name: 'Inventory' },
    { icon: 'pricetags', name: 'Collections' },
    { icon: 'gift', name: 'Gift cards' },
    { icon: 'enter', name: 'Transfers' },
  ];

  products: Product[] = [];
  @ViewChild('content') content!: HTMLIonContentElement;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
    window.addEventListener('statusTap', () => {
      this.content.scrollToTop(400);
    });
  }

  loadProducts() {
    // load products from fakestore api
    this.http
      .get<Product[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        console.log(data);
        this.products = data;
      });
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
