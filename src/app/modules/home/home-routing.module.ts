import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'mantenimiento',
    pathMatch :'full'
  },
  {
    path: 'mantenimiento',
    component:MantenimientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
