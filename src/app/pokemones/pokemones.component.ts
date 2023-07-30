import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperServiceService } from '../helper-service.service';
import { PokemonModel } from '../model/PokemonModel';
import { Resultado } from '../model/Resultado';
import { ServicesService } from '../servicio/services.service';
import { forkJoin,Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
interface PokemonData {
  name: string;
  sprites: {
    other: {
      dream_world:{
        front_default:string
      }
    }
  };

}

interface Question {
  image: string;
  options: string[];
  answer: string;
}

@Component({
  selector: 'app-pokemones',
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.css']
})

export class PokemonesComponent implements OnInit{
  timer:number;
  current = 0;

  questions: Question[] = [];
  currentQuestionIndex: number;

  time: any;
  numberCorrect : number = 0;
  intervalo: any;

  constructor(private service:ServicesService,private router:Router,
              private helper:HelperServiceService,
              private http: HttpClient) {
    this.consultarApiPokemon();
   
    this.timer = 10;
    this.numberCorrect = 0;
    this.currentQuestionIndex = 0;  
     this.helper.modificarCantidad('');
   
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.detenerContador();
  }
  ngAfterContentInit():void{
    this.iniciarContador();
  }
 
   consultarApiPokemon() {
     const numerosRandom: number[] = [];
     for (let i = 0; i < 40; i++) {
       const numero = Math.floor(Math.random() * 600) + 1;
       numerosRandom.push(numero);
     }
 
     const consultas = numerosRandom.map((numero) =>
       this.http.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon/${numero}`)
     );
 
     forkJoin(consultas).subscribe((pokemones: PokemonData[]) => {
       const grupos = this.dividirLista(pokemones, 10);
 
       for (const grupo of grupos) {
         const preguntasGrupo: Question[] = [];
 
         for (const pokemon of grupo) {
           const opciones = this.obtenerOpcionesRespuesta(pokemones, pokemon.name);
           const pregunta: Question = {
             image: pokemon.sprites.other.dream_world.front_default,
             options: opciones,
             answer: pokemon.name
           };
 
           preguntasGrupo.push(pregunta);
         }
 
         const preguntaSeleccionada = this.obtenerElementoAleatorio(preguntasGrupo);
         this.questions.push(preguntaSeleccionada);
       }
     });
   }
 
   dividirLista<T>(lista: T[], partes: number): T[][] {
     const longitudParte = Math.ceil(lista.length / partes);
     return new Array(partes).fill(null).map((_, index) =>
       lista.slice(index * longitudParte, (index + 1) * longitudParte)
     );
   }
 
   obtenerElementoAleatorio<T>(lista: T[]): T {
     const indiceAleatorio = Math.floor(Math.random() * lista.length);
     return lista[indiceAleatorio];
   }
 
   obtenerOpcionesRespuesta(pokemones: PokemonData[], respuestaCorrecta: string): string[] {
     const opciones = [];
     const nombres = pokemones.map((pokemon) => pokemon.name);
     opciones.push(respuestaCorrecta);
 
     while (opciones.length < 4) {
       const nombreAleatorio = this.obtenerElementoAleatorio(nombres);
       if (!opciones.includes(nombreAleatorio)) {
         opciones.push(nombreAleatorio);
       }
     }
 
     return this.shuffleArray(opciones);
   }
 
   shuffleArray(array: any[]): any[] {
     for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
     }
     return array;
   }

  checkAnswer(question: string) {
  
    const answer = this.questions[this.currentQuestionIndex].answer;
    this.timer = 10
    const image = document.getElementById('image');
    image?.classList.remove('imagen-negra')
    if(answer == question){
        this.numberCorrect++;
    }
    this.detenerContador();
  console.log(this.currentQuestionIndex)
    if(this.currentQuestionIndex < 9){
      setTimeout(()=>{        
        this.currentQuestionIndex ++;
        this.nextPokemon();   
        this.iniciarContador();
      }, 1500);
    }else{
      
      this.helper.modificarCantidad(this.numberCorrect.toString());
      this.router.navigate(['resultados']);
    }
  }
  iniciarContador() {
    this.intervalo = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.reiniciarContador();
      }
    }, 1000);
  }

  detenerContador() {
    clearInterval(this.intervalo);
  }

  reiniciarContador() {
    this.timer = 10;
    this.checkAnswer('');
  }
 

  nextPokemon():void{
    const image = document.getElementById('image');
    image?.classList.add('imagen-negra')
  }

}


