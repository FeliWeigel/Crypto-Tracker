import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

export const authRoutes : Routes = [
    {
        path: '',
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'update',
                component: RegisterComponent
            },
            {
                path: 'profile',
                component: LoginComponent
            }
        ]
    }
    
]