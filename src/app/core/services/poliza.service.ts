import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseApi } from 'src/app/modules/auth/models/ResponseApi';
import { FilterPolizaDto } from 'src/app/modules/home/models/FilterPolizaDto';
import { Poliza } from 'src/app/modules/home/models/Poliza';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  poliza = new Subject<any>();

  url = `${environment.HOST}/MantenimientoPoliza`

  constructor(private http: HttpClient) {
    console.log(`${this.url}/ListarRegistrosPoliza`);
   }

  list(filterDto:FilterPolizaDto){
    return this.http.post<ResponseApi>(`${this.url}/ListarRegistrosPoliza`,filterDto).pipe(
      map(response => {
        return response.Data;
      })
    )
  }

  add(poliza:Poliza) {
    return this.http.post<ResponseApi>(`${this.url}/RegistrarPolizaXPersona`,poliza).pipe(
      map(response => {
        return response.Data;
      })
    )
  }

  view(cod_poliza:string) {
    const params = new HttpParams()
    .set('cod_poliza',cod_poliza)
    return this.http.get<ResponseApi>(`${this.url}/FiltrarPolizaForm`,{params}).pipe(
      map(response => {
        return response.Data;
      })
    )
  }

}
