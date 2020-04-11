import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }
  getCursos(){
   return ['java','Vida','angular','kakaroto verme meldito', 'mais um '] ;
  }
}
