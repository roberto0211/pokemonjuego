import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonesComponent } from './pokemones/pokemones.component';
import { RouterModule } from '@angular/router';
import { ResultadoComponent } from './resultado/resultado.component';
import {HelperServiceService} from './helper-service.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonesComponent,
    ResultadoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [RouterModule,HelperServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
