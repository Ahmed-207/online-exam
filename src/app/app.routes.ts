import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
        path: 'auth', loadComponent: () => import('./core/layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent), children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'email-confirm', loadComponent: () => import('./features/auth/components/email-confirm/email-confirm.component').then((c) => c.EmailConfirmComponent), title: 'Create Account' },
            { path: 'verify-otp', loadComponent: () => import('./features/auth/components/verify-otp/verify-otp.component').then((c) => c.VerifyOtpComponent), title: 'Create Account' },
            { path: 'register', loadComponent: () => import('./features/auth/components/register/register.component').then((c) => c.RegisterComponent), title: 'Create Account' },
            { path: 'create-pass', loadComponent: () => import('./features/auth/components/create-pass/create-pass.component').then((c) => c.CreatePassComponent), title: 'Create Account' },
            { path: 'login', loadComponent: () => import('./features/auth/components/login/login.component').then((c) => c.LoginComponent), title: 'Login' },
            { path: 'forget-password', loadComponent: () => import('./features/auth/components/forget-password/forget-password.component').then((c) => c.ForgetPasswordComponent), title: 'Forgot Password ?' },
            { path: 'verify-repass', loadComponent: () => import('./features/auth/components/verify-repass/verify-repass.component').then((c) => c.VerifyRepassComponent), title: 'Check your mail' },
            { path: 'repass', loadComponent: () => import('./features/auth/components/repass/repass.component').then((c) => c.RepassComponent), title: 'Create New Password' }
        ]
    }
];
