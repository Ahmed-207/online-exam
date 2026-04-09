import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const plat_id = inject(PLATFORM_ID);

  if(isPlatformBrowser(plat_id)){
    const token = localStorage.getItem('token');
    if(token){
      return true
    }
  }

  return router.parseUrl('/login');
};
