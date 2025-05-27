import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'crypto', 
        loadChildren: () => import("./modules/crypto/crypto.routes").then(e => e.cryptoRoutes)
    },
    {
        path: 'auth',
        loadChildren: () => import("./modules/auth/auth.routes").then(e=> e.authRoutes)
    }
];

