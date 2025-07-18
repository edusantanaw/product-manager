import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';

export const routes: Routes = [
    {
        path: "",
        component: ProductComponent
    },
    {
        path: "product/:id",
        component: ViewProductComponent,
    },
    {
        path: "management",
        component: ProductManagementComponent,
    },
    {
        path: "not-found",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found"
    }
];
