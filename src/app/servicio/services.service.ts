import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url = environment.baseUrl;
  constructor(private http: HttpClient) {

   }
   getPokemones(i:number){
     console.log(this.url + '/pokemon/'+i);
    return this.http.get<any>(this.url + '/pokemon/'+i);

   }
}
