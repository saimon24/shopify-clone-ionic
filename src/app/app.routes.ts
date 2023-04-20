import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders/orders.page').then((m) => m.OrdersPage),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.page').then((m) => m.ProductsPage),
      },
      {
        path: 'products/details',
        loadComponent: () =>
          import('./pages/details/details.page').then((m) => m.DetailsPage),
      },
      {
        path: 'store',
        loadComponent: () =>
          import('./pages/store/store.page').then((m) => m.StorePage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
