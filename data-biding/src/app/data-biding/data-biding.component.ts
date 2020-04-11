import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-biding',
  templateUrl: './data-biding.component.html',
  styleUrls: ['./data-biding.component.css']
})
export class DataBidingComponent implements OnInit {
  url = 'https:\\10.10.10.14';
  cursoAngular: boolean = true; 
  urlImagem: string = 'https://i.picsum.photos/id/10/2500/1667.jpg';

  valorAtual: string = ''; 
  valorSalvo: String = ''; 
  valorBlur: String = ''; 
  isMouseOver: Boolean = true; 

  nomeDoCurso: string = 'Angular'; 

  valorInicial = 15; 



  

  getvalor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  boatClickado(){
    alert("caraaaaaalho"); 
  }

  salvarValor(valor){
    this.valorSalvo = valor ; 

  }

  blurValor(valor) {
    this.valorBlur = valor ; 

  }

  onMouseOverOut(){
    this.isMouseOver =! this.isMouseOver;

  }


onMudouValor(evento){
  console.log(evento.novoValor);

}

  onKeyUp(evento: KeyboardEvent){
    console.log((<HTMLInputElement>evento.target).value);
    this.valorAtual = (<HTMLInputElement>evento.target).value

  }
  constructor() { }

  ngOnInit(): void {
  }

}
