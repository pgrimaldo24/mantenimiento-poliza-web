import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { angularMaterialModule } from 'src/app/shared/util/angular-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    angularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[LoginComponent,angularMaterialModule],
  providers:[AuthService]
})
export class AuthModule { }
