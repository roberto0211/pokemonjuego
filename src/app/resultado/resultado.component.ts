import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperServiceService } from '../helper-service.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  cantidadbuenas:string = '';
  felicidades:boolean = false;
  constructor(private helper:HelperServiceService,private router:Router) { }

  ngOnInit(): void {
    this.helper.mandarCantidad.subscribe(msg => this.cantidadbuenas = msg);
    if(this.cantidadbuenas == '')
      this.router.navigate(['']);
    if(+this.cantidadbuenas > 6)
      this.felicidades = true;

  }

}
