import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { userGuardGuard } from './core/guards/user-guard-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', loadComponent: () => import('./core/layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent), canActivate: [userGuardGuard], children: [
            { path: 'register', loadComponent: () => import('./features/auth/components/register-flow/register-flow.component').then((c) => c.RegisterFlowComponent), title: 'register' },
            { path: 'login', loadComponent: () => import('./features/auth/components/login/login.component').then((c) => c.LoginComponent), title: 'Login' },
            { path: 'forget-password', loadComponent: () => import('./features/auth/components/forget-password/forget-password.component').then((c) => c.ForgetPasswordComponent), title: 'Forgot Password ?' },
            { path: 'verify-repass', loadComponent: () => import('./features/auth/components/verify-repass/verify-repass.component').then((c) => c.VerifyRepassComponent), title: 'Check your mail' },
            { path: 'reset-password', loadComponent: () => import('./features/auth/components/repass/repass.component').then((c) => c.RepassComponent), title: 'Create New Password' }
        ]
    },
    {
        path: 'home', loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then((c) => c.MainLayoutComponent), canActivate: [authGuardGuard], title: 'Home', children: [
            { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
            { path: 'diplomas', loadComponent: () => import('./features/main/pages/diplomas-page/diplomas-page.component').then((c) => c.DiplomasPageComponent), title: 'Diplomas' },
            { path: 'diplomas/:id', loadComponent: () => import('./features/main/pages/exams-page/exams-page.component').then((c) => c.ExamsPageComponent), title: 'Exams' },
            { path: 'diplomas/:id/:examId', loadComponent: () => import('./features/main/pages/exams-page/components/exam-ques/exam-ques.component').then((c) => c.ExamQuesComponent), title: 'Questions' },
            { path: 'account', loadComponent: () => import('./features/main/pages/account-page/account-page.component').then((c) => c.AccountPageComponent), title: 'Account Setting', children: [
                { path: 'change-password', loadComponent: ()=> import('./features/main/pages/account-page/components/change-password/change-password.component').then((c)=> c.ChangePasswordComponent), title: 'Change Password' }
            ] }
        ]
    }
    ,
    {
        path: '**', loadComponent: () => import('./features/error-page/error-page.component').then((c) => c.ErrorPageComponent), title: 'No Page Found'
    }
];
