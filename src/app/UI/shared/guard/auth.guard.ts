import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem(environment.tokenName);
  if (token) {
    return of(true);
  } else {
    router.navigateByUrl('/login');
    return of(false);
  }
};
