import { Routes } from "@angular/router";
import { CryptolistComponent } from "./cryptolist/cryptolist.component";
import { CryptoDetailsComponent } from "./cryptodetails/crypto-details/crypto-details.component";
export const cryptoRoutes : Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: CryptolistComponent
            },
            {
                path: ':id/details',
                component: CryptoDetailsComponent
            }
        ]
    }
]