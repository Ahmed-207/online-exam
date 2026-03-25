import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch:'full' },
    { path: 'auth', loadComponent: ()=> import('./core/layouts/auth-layout/auth-layout.component').then((c)=>c.AuthLayoutComponent), children : [
        {path: '', redirectTo: 'login', pathMatch:'full'},
        { path: 'register', loadComponent: ()=> import('./features/auth/components/register/register.component').then((c)=>c.RegisterComponent), title: 'Create Account' },
        {path: 'login', loadComponent: ()=> import('./features/auth/components/login/login.component').then((c)=>c.LoginComponent), title: 'Login'  },
        {path: 'forget-password', loadComponent: ()=> import('./features/auth/components/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent), title: 'Forgot Password ?' },
        {path: 'verify-otp', loadComponent: ()=> import('./features/auth/components/verify-otp/verify-otp.component').then((c)=>c.VerifyOtpComponent), title: 'Verify OTP' },
        {path: 'verify-repass', loadComponent: ()=> import('./features/auth/components/verify-repass/verify-repass.component').then((c)=>c.VerifyRepassComponent), title: 'Check your mail' },
        {path: 'repass', loadComponent: ()=> import('./features/auth/components/repass/repass.component').then((c)=>c.RepassComponent), title: 'Create New Password' }
    ] }
];
