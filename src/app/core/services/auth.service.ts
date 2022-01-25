import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CredentialDto } from '../../modules/auth/models/CredentialDto';
import { ResponseApi } from '../../modules/auth/models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `${environment.HOST}/Auth`;

  login(loginDto:CredentialDto){
    if(!loginDto.User || !loginDto.Password){
      return null;
    } else {
      return this.http.post<ResponseApi>(`${this.url}/Authentication`,loginDto).pipe(
        map((respuesta:ResponseApi) => {
          localStorage.setItem('token',respuesta.Data);
          return true;
        })
      )
    }
  }

  constructor(private http:HttpClient) { }
}
