import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { DbzComponent } from './pages/dbz/dbz.component';
import { ErrorComponent } from './pages/error/error.component';
import { CocktailsComponent } from './pages/cocteles/cocteles.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path:'pokemon', component: PokemonComponent},
    {path:'dbz', component: DbzComponent},
    {path:'cocteles', component: CocktailsComponent},
    {path:'list-miapi', loadChildren: () => import('./pages/miapi/miapi-routing.module').then(m => m.MiapiRoutingModule)},
    {path:'**', component: ErrorComponent}
];

