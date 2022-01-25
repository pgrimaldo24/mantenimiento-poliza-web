import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PolizaService } from 'src/app/core/services/poliza.service';
import { ModalMantenimientoCrudComponent } from '../modal-mantenimiento-crud/modal-mantenimiento-crud.component';


@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit, AfterViewInit {

  DATA_TABLE = [
    { ApePaterno: "pruebasP", ApeMaterno: "pruebasM", NomPersona: "nombres1", Cod_Persona: "001", Cod_Poliza: "001", acciones: true },
    { ApePaterno: "pruebasP2", ApeMaterno: "pruebasM", NomPersona: "nombres2", Cod_Persona: "002", Cod_Poliza: "002", acciones: true },
    { ApePaterno: "pruebasP3", ApeMaterno: "pruebasM", NomPersona: "nombres3", Cod_Persona: "003", Cod_Poliza: "003", acciones: true }
  ]

  displayedColumns: string[] = ['ApePaterno', 'ApeMaterno', 'NomPersona', 'Cod_Persona', 'Cod_Poliza', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, public dialog: MatDialog, private polizaService: PolizaService) {

  }
  ngOnInit(): void {
    this.listGrilla();
  }

  listGrilla() {
    let filterDto = {
      Page: 1,
      PageSize: 10,
      ColumnOrder: "ASC",
      Order: "",
      Cod_Poliza: ""
    }
    this.polizaService.list(filterDto).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.Results);
      this.dataSource.paginator = data.CurrentPage
    })
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("login");
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async openDialogMantenimiento(row?: any, accion?: string) {
    if(row) {
      this.polizaService.view(row.Cod_Poliza).subscribe(async (data) => {
        const dialogRef = this.dialog.open(ModalMantenimientoCrudComponent, {
          width: '300px',
          data: {data:await data,action:accion}
        })
  
        dialogRef.beforeClosed().subscribe(result => {
          if (result.updateGrilla != null && typeof result.updateGrilla != 'undefined') {
            if (result.updateGrilla) {
              this.listGrilla();
            }
          }
        });
      });
    } else {
      const dialogRef = this.dialog.open(ModalMantenimientoCrudComponent, {
        width: '300px',
        data: {data:null,action:""}
      })

      dialogRef.beforeClosed().subscribe(result => {
        if (result.updateGrilla != null && typeof result.updateGrilla != 'undefined') {
          if (result.updateGrilla) {
            this.listGrilla();
          }
        }
      });
    }
    
  }
}