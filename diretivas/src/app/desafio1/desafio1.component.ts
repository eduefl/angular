//https://developer.mozilla.org/en-US/docs/Web/Events pesquisar eventos disponiveis 

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desafio1',
  templateUrl: './desafio1.component.html',
  styleUrls: ['./desafio1.component.scss']
})
export class Desafio1Component implements OnInit {
  valorAtual: string  = '';
  valorSalvo: string  = '';
  cor : string = 'white';
  cursos: string[] = [];
  

  mudacombo(item){
    this.valorSalvo= item;


  }

  onMouseOver(){

    this.cor = this.valorSalvo;

  }

  onMouseOut(){

    this.cor = 'white';

  }
  preenchearray(){
    this.cursos.push("White");    
    this.cursos.push("Black");
    this.cursos.push("grey11");
    this.cursos.push("grey21");
    this.cursos.push("grey31");
    this.cursos.push("DimGray");
    this.cursos.push("Gray");
    this.cursos.push("DarkGray");
    this.cursos.push("Silver");
    this.cursos.push("LightGrey");
    this.cursos.push("Gainsboro");
    this.cursos.push("SlateBlue");
    this.cursos.push("SlateBlue1");
    this.cursos.push("SlateBlue3");
    this.cursos.push("DarkSlateBlue");
    this.cursos.push("MidnightBlue");
    this.cursos.push("Navy");
    this.cursos.push("DarkBlue");
    this.cursos.push("MediumBlue");
    this.cursos.push("Blue");
    this.cursos.push("CornflowerBlue");
    this.cursos.push("RoyalBlue");
    this.cursos.push("DodgerBlue");
    this.cursos.push("DeepSkyBlue");
    this.cursos.push("LightSkyBlue");
    this.cursos.push("SkyBlue");
    this.cursos.push("LightBlue");
    this.cursos.push("SteelBlue");
    this.cursos.push("LightSteelBlue");
    this.cursos.push("SlateGray");
    this.cursos.push("LightSlateGray");
    this.cursos.push("Aqua / Cyan");
    this.cursos.push("DarkTurquoise");
    this.cursos.push("Turquoise");
    this.cursos.push("MediumTurquoise");
    this.cursos.push("LightSeaGreen");
    this.cursos.push("DarkCyan");
    this.cursos.push("Teal");
    this.cursos.push("Aquamarine");
    this.cursos.push("MediumAquamarine");
    this.cursos.push("CadetBlue");
    this.cursos.push("DarkSlateGray");
    this.cursos.push("MediumSpringGreen");
    this.cursos.push("SpringGreen");
    this.cursos.push("PaleGreen");
    this.cursos.push("LightGreen");
    this.cursos.push("DarkSeaGreen");
    this.cursos.push("MediumSeaGreen");
    this.cursos.push("SeaGreen");
    this.cursos.push("DarkGreen");
    this.cursos.push("Green");
    this.cursos.push("ForestGreen");
    this.cursos.push("LimeGreen");
    this.cursos.push("Lime");
    this.cursos.push("LawnGreen");
    this.cursos.push("Chartreuse");
    this.cursos.push("GreenYellow");
    this.cursos.push("YellowGreen");
    this.cursos.push("OliveDrab");
    this.cursos.push("DarkOliveGreen");
    this.cursos.push("Olive");
    this.cursos.push("DarkKhaki");
    this.cursos.push("Goldenrod");
    this.cursos.push("DarkGoldenrod");
    this.cursos.push("SaddleBrown");
    this.cursos.push("Sienna");
    this.cursos.push("RosyBrown");
    this.cursos.push("Peru");
    this.cursos.push("Chocolate");
    this.cursos.push("SandyBrown");
    this.cursos.push("NavajoWhite");
    this.cursos.push("Wheat");
    this.cursos.push("BurlyWood");
    this.cursos.push("Tan");
    this.cursos.push("MediumSlateBlue");
    this.cursos.push("MediumPurple");
    this.cursos.push("BlueViolet");
    this.cursos.push("Indigo");
    this.cursos.push("DarkViolet");
    this.cursos.push("DarkOrchid");
    this.cursos.push("MediumOrchid");
    this.cursos.push("Purple");
    this.cursos.push("DarkMagenta");
    this.cursos.push("Fuchsia / Magenta");
    this.cursos.push("Violet");
    this.cursos.push("Orchid");
    this.cursos.push("Plum");
    this.cursos.push("MediumVioletRed");
    this.cursos.push("DeepPink");
    this.cursos.push("HotPink");
    this.cursos.push("PaleVioletRed");
    this.cursos.push("LightPink");
    this.cursos.push("Pink");
    this.cursos.push("LightCoral");
    this.cursos.push("IndianRed");
    this.cursos.push("Crimson");
    this.cursos.push("Maroon");
    this.cursos.push("DarkRed");
    this.cursos.push("FireBrick");
    this.cursos.push("Brown");
    this.cursos.push("Salmon");
    this.cursos.push("DarkSalmon");
    this.cursos.push("LightSalmon");
    this.cursos.push("Coral");
    this.cursos.push("Tomato");
    this.cursos.push("Red");
    this.cursos.push("OrangeRed");
    this.cursos.push("DarkOrange");
    this.cursos.push("Orange");
    this.cursos.push("Gold");
    this.cursos.push("Yellow");
    this.cursos.push("Khaki");
    this.cursos.push("AliceBlue");
    this.cursos.push("GhostWhite");
    this.cursos.push("Snow");
    this.cursos.push("Seashell");
    this.cursos.push("FloralWhite");
    this.cursos.push("WhiteSmoke");
    this.cursos.push("Beige");
    this.cursos.push("OldLace");
    this.cursos.push("Ivory");
    this.cursos.push("Linen");
    this.cursos.push("Cornsilk");
    this.cursos.push("AntiqueWhite");
    this.cursos.push("BlanchedAlmond");
    this.cursos.push("Bisque");
    this.cursos.push("LightYellow");
    this.cursos.push("LemonChiffon");
    this.cursos.push("LightGoldenrodYellow");
    this.cursos.push("PapayaWhip");
    this.cursos.push("PeachPuff");
    this.cursos.push("Moccasin");
    this.cursos.push("PaleGoldenrod");
    this.cursos.push("MistyRose");
    this.cursos.push("LavenderBlush");
    this.cursos.push("Lavender");
    this.cursos.push("Thistle");
    this.cursos.push("Azure");
    this.cursos.push("LightCyan");
    this.cursos.push("PowderBlue");
    this.cursos.push("PaleTurquoise");
    this.cursos.push("Honeydew");
    this.cursos.push("MintCream");
    
  }


  constructor() {
    this.preenchearray();

   }

  ngOnInit() {
  }

}
