import { visitValue } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PolizaService } from 'src/app/core/services/poliza.service';
import Swal from 'sweetalert2';
import { Poliza } from '../../models/Poliza';

@Component({
  selector: 'app-modal-mantenimiento-crud',
  templateUrl: './modal-mantenimiento-crud.component.html',
  styleUrls: ['./modal-mantenimiento-crud.component.css']
})
export class ModalMantenimientoCrudComponent implements OnInit {

  /**regex */
  formatNumber: RegExp = /^[0-9]$/;

  datamodal:any;

  get formulario() { return this.validateRegister.controls }

  validateRegister = this.form.group({
    apellidoP: [null, Validators.required],
    apellidoM: [null, Validators.required],
    nombres: [null, Validators.required],
    codP: [{ value: this.random(), disabled: true }],
    fchInicio: [null, Validators.required],
    montoPrima: [null, Validators.required],
    igv: [null, [Validators.required]],
    codPoliza: [{ value: this.random(), disabled: true }], 
    Monto_Prima_Neta : [null, null]
  });

  

  constructor(private form: FormBuilder, private polizaService:PolizaService,@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<any>,) { }


  async ngOnInit() {
    this.datamodal = await this.data;
    if(this.data.data){
      await this.setForm( this.datamodal.data);
    }
    
    //this.validateRegister.controls.codP.setValue(this.aleatorio());
  }

  random() {
    return "0000" + String(Math.floor(Math.random() * (99 - 10)) + 1);
  }

  formatNum(evt: any) {
    return this.formatNumber.test(String.fromCharCode(evt.charCode));
  }

  close(){
    this.dialogRef.close();
  }

  setForm(data:any){
    this.validateRegister.get("apellidoM").setValue(data.ApellidoMaterno);
    this.validateRegister.controls.apellidoP.patchValue(data.ApellidoPaterno);
    this.validateRegister.controls.codP.patchValue(data.CodPersona);
    this.validateRegister.controls.codPoliza.patchValue(data.NumPoliza);
    this.validateRegister.controls.fchInicio.patchValue(data.Fecha_Inicio_Vigencia);
    this.validateRegister.controls.igv.patchValue(data.IGV);
    this.validateRegister.controls.montoPrima.patchValue(data.Monto_Prima_Bruta);
    this.validateRegister.controls.nombres.patchValue(data.Nombres);
    this.validateRegister.controls.Monto_Prima_Neta.patchValue(data.Monto_Prima_Neta);
  }

  save(){
    // console.log(this.validateRegister.value);
    // return;
    if(this.validateRegister.valid){
      let poliza : Poliza = {
        ApellidoMaterno: this.validateRegister.controls.apellidoM.value,
        ApellidoPaterno: this.validateRegister.controls.apellidoP.value,
        Cod_Persona: this.validateRegister.controls.codP.value,
        Cod_Poliza: this.validateRegister.controls.codPoliza.value,
        Fecha_Inicio_Vigencia: this.validateRegister.controls.fchInicio.value,
        IGV: Number(this.validateRegister.controls.igv.value),
        Monto_Prima_Bruta: Number(this.validateRegister.controls.montoPrima.value),
        Nombres: this.validateRegister.controls.nombres.value,
      }

      this.polizaService.add(poliza).subscribe(data => {
        Swal.fire(
          'Registro exitoso',
          'Se registro correctamente!',
          'success'
        ).then( data => {
         if(data.isConfirmed){
           this.dialogRef.close({updateGrilla:true})
         }
        })
      })
    }
  }

}
