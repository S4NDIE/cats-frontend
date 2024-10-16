import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './UI/modules/login/login.component';
import { DefaultComponent } from './UI/layouts/default/default.component';
import { HomeComponent } from './UI/modules/home/home.component';
import { authGuard } from './UI/shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./UI/modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'breeds',
        loadChildren: () =>
          import('./UI/modules/breed-info/breed-info.module').then(
            (m) => m.BreedInfoModule
          ),
      },
      {
        path: 'table-breeds',
        loadChildren: () =>
          import('./UI/modules/breed-table/breed-table.module').then(
            (m) => m.BreedTableModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
