import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalAlertComponent } from 'src/app/modules/home/components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  get formulario() { return this.validateLogin.controls }

  validateLogin = this.form.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private form: FormBuilder, private authService: AuthService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }

  login() {
    // this.router.navigateByUrl("mantenimiento");
    // return;
    if (this.validateLogin.valid) {
      let loginDto = {
        User: this.validateLogin.controls.username.value,
        Password: this.validateLogin.controls.password.value,
      }
      this.authService.login(loginDto).subscribe(validateLogin => {
        if (validateLogin) {
          console.log(validateLogin);
          this.router.navigateByUrl("mantenimiento");
        } else {
          this.openAlert();
        }
      })
    }

  }

  openAlert() {
    this._snackBar.openFromComponent(ModalAlertComponent, {
      duration: 2 * 1000,
    });
  }

}
