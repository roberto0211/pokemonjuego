import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonesComponent } from './pokemones/pokemones.component';
import { HomeComponent } from './home/home.component';
import { ResultadoComponent } from './resultado/resultado.component';

const routes:Routes = [
  { path: '', component: HomeComponent},
  { path: 'game', component: PokemonesComponent},
  { path: 'resultados', component: ResultadoComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})


export class AppRoutingModule {

 }
