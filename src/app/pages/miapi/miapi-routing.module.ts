import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMiapiComponent } from './pages/list-miapi/list-miapi.component';
import { ListMyApiComponent } from './list-my-api/list-my-api.component';
import { CreateMyApiComponent } from './create-my-api/create-my-api.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' }, // Redirigir a la ruta de listar
  { path: 'list', component: ListMyApiComponent }, // Ruta para listar
  { path: 'create', component: CreateMyApiComponent }, // Ruta para crear
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiapiRoutingModule { }
