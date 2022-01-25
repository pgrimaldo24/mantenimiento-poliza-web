import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { angularMaterialModule } from 'src/app/shared/util/angular-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalMantenimientoCrudComponent } from './components/modal-mantenimiento-crud/modal-mantenimiento-crud.component';


@NgModule({
  declarations: [
    MantenimientoComponent,
    ModalAlertComponent,
    ModalMantenimientoCrudComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    angularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  exports:[angularMaterialModule],
})
export class HomeModule { }
