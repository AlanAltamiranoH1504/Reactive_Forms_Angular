import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "reactive", 
        loadChildren: () => import("./reactive/reactive.routes").then(r => r.reactiveRoutes)
    }, 
    {
        path: "auth",
        loadChildren: () => import("./auth/auth.routes").then(r => r.authRoutes)
    },
    {
        path: "country",
        loadChildren: () => import("./country/country.routes").then(r => r.countryRoutes)
    }
];
