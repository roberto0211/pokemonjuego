import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperServiceService } from '../helper-service.service';
import { PokemonModel } from '../model/PokemonModel';
import { Resultado } from '../model/Resultado';
import { ServicesService } from '../servicio/services.service';

@Component({
  selector: 'app-pokemones',
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.css']
})
export class PokemonesComponent implements OnInit {
  pokemon: PokemonModel = new PokemonModel();
  lista:PokemonModel[] = [];
  numeros : number[] = [1,2,3,4];
  aparecer:Boolean= false;
  resultados:Resultado[] = [];
  resultado:Resultado = new Resultado();
  index:number = 1;
  temporizador:number  = 10;
  timer: any = setInterval(() => {this.reloj()},1000);
  cantidadBuenas:string = '';

  constructor(private service:ServicesService,private router:Router,
              private helper:HelperServiceService) {
    this.numeros = this.elegirNumber(this.numeros);
    this.timer;
   }
   reloj(){
    this.temporizador --;
    if(this.temporizador == 0)
      {
          clearInterval(this.timer);
          this.seleccionar('');//seleccinar ninguna == erroneo

      }
   }
  inicializardenuevo(){
    this.timer = setInterval(() => {this.reloj()},1000);
  }
  ngOnInit(): void {
    this.getPokemones();
  }
  getRandom(max:number):number{
    return Math.floor(Math.random() * max) + 1;
  }

  elegirNumber(array:number[]){

      var currentIndex = array.length, temporaryValue, randomIndex;


      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

  seleccionar(name:string){
    clearInterval(this.timer);
    this.resultado = new Resultado();
    if(name == this.lista[0].name){
      this.resultado.id = this.index;
      this.resultado.resultado = "success";
    }
    else{
      this.resultado.id = this.index;
      this.resultado.resultado = "error";
    }
    this.resultados.push(this.resultado);
    this.aparecer = true;
    if(this.resultados.length < 10){
      setTimeout(()=>{                           // <<<---using ()=> syntax
        this.updatePokemones();
      }, 1500);
    }else{
      clearInterval(this.timer);
      this.router.navigate(['resultados']);
      this.cantidadBuenas = '' + this.resultados.filter(e => e.resultado === 'success').length;
      this.helper.modificarCantidad(this.cantidadBuenas);
    }
  }
  getPokemones(){

    for(let i = 0; i<4;i++){
      this.service.getPokemones(this.getRandom(600)).subscribe(
        res => {
          this
          this.pokemon = new PokemonModel();
           this.pokemon.name = res.name;
           this.pokemon.imagen =res.sprites.other.dream_world.front_default;
           this.lista.push(this.pokemon);
        },
        err =>{
          console.log(this.lista.length);

        }
      );
    }
  }

  updatePokemones(){
    this.lista = [];
    this.aparecer = false;
    this.temporizador = 10;
    this.getPokemones();
    clearInterval(this.timer);
    this.inicializardenuevo();
  }

}
