import { Component, OnInit } from '@angular/core';


// https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave

@Component({
  selector: 'app-cubo',
  templateUrl: './cubo.component.html',
  styleUrls: ['./cubo.component.scss']
})
export class CuboComponent implements OnInit {

  constructor() { }
  static readonly _AZUL = "rgb(10, 10, 102)"
  static readonly _VERMELHO = "#BD0202"
  static readonly _LARANJA = "orangered"
  static readonly _AMARELO = "#FFFF00"
  static readonly _BRANCO = "whitesmoke"
  static readonly _VERDE = "green"

  static readonly _FACE_BRANCO = 0;
  static readonly _FACE_AZUL = 1;
  static readonly _FACE_AMARELO = 2;
  static readonly _FACE_VERDE = 3;
  static readonly _FACE_LARANJA = 4;
  static readonly _FACE_VERMELHO = 5;

  static readonly _UP = 0
  static readonly _DOWN = 1
  static readonly _RIGHT = 2
  static readonly _LEFT = 3
  static readonly _BACK = 4



  aFaceVis = new Array;
  aLine = new Array;
  aCubo = new Array;
  aMapa = new Array;
  nSelect: number;


  ngOnInit() {

    for (let i = 0; i < 6; i++) {
      this.aCubo.push(this.montaFaces(i));
      this.montaMapa(i);

    }
    this.nSelect = 0;
    this.aFaceVis = this.aCubo[this.nSelect]

  }
  getUp(nSelect) {
    return this.aMapa[nSelect][CuboComponent._UP]
  }
  getDown(nSelect) {
    return this.aMapa[nSelect][CuboComponent._DOWN]
  }
  getRight(nSelect) {
    return this.aMapa[nSelect][CuboComponent._RIGHT]
  }
  getLeft(nSelect) {
    return this.aMapa[nSelect][CuboComponent._LEFT]
  }
  getBack(nSelect) {
    return this.aMapa[nSelect][CuboComponent._BACK]
  }
  montaMapa(nOpc)
  // 0 Branca
  // 1 Azul
  // 2 Amarela
  // 3 Verde
  // 4 Laranja
  // 5 Vermelha

  //Cordinates
  //0 up
  //1 down
  //2 right
  //3 left
  //4 back

  {
    switch (nOpc) {
      case CuboComponent._FACE_BRANCO: // 0 branca
        this.aMapa.push([CuboComponent._FACE_LARANJA, CuboComponent._FACE_VERMELHO, CuboComponent._FACE_AZUL, CuboComponent._FACE_VERDE, CuboComponent._FACE_AMARELO]);
        break
      case CuboComponent._FACE_AZUL: // 1 azul
        this.aMapa.push([CuboComponent._FACE_LARANJA, CuboComponent._FACE_VERMELHO, CuboComponent._FACE_AMARELO, CuboComponent._FACE_BRANCO, CuboComponent._FACE_VERDE]);
        break
      case CuboComponent._FACE_AMARELO: // 2 amarela
        this.aMapa.push([CuboComponent._FACE_LARANJA, CuboComponent._FACE_VERMELHO, CuboComponent._FACE_VERDE, CuboComponent._FACE_AZUL, CuboComponent._FACE_BRANCO]);
        break
      case CuboComponent._FACE_VERDE: // 3 verde
        this.aMapa.push([CuboComponent._FACE_LARANJA, CuboComponent._FACE_VERMELHO, CuboComponent._FACE_BRANCO, CuboComponent._FACE_AMARELO, CuboComponent._FACE_AZUL]);
        break
      case CuboComponent._FACE_LARANJA: // 4 laranja
        this.aMapa.push([CuboComponent._FACE_AZUL, CuboComponent._FACE_VERDE, CuboComponent._FACE_BRANCO, CuboComponent._FACE_AMARELO, CuboComponent._FACE_VERMELHO]);
        break
      case CuboComponent._FACE_VERMELHO: // 5 vermelha
        this.aMapa.push([CuboComponent._FACE_AZUL, CuboComponent._FACE_VERDE, CuboComponent._FACE_AMARELO, CuboComponent._FACE_BRANCO, CuboComponent._FACE_LARANJA]);
        break
    }
    console.log("CuboComponent -> constructor -> this.aMapa.", this.aMapa);


  }

  montaFaces(nOpc) {
    // 0 Branca
    // 1 Azul
    // 2 Amarela
    // 3 Verde
    // 4 Laranja
    // 5 Vermelha
    let aLine = new Array;
    let aFaceRet = new Array;
    aLine = [];
    switch (nOpc) {
      case CuboComponent._FACE_BRANCO: // 0 Branca
        aLine.push(CuboComponent._AMARELO);
        aLine.push(CuboComponent._BRANCO);
        aLine.push(CuboComponent._VERDE);
        aFaceRet.push(aLine);

        aLine = [];
        // ----------------------------------------------------------------
        aLine.push(CuboComponent._BRANCO);
        aLine.push(CuboComponent._BRANCO);
        aLine.push(CuboComponent._VERDE);

        aFaceRet.push(aLine);
        aLine = [];
        // ----------------------------------------------------------------

        aLine.push(CuboComponent._AMARELO);
        aLine.push(CuboComponent._LARANJA);
        aLine.push(CuboComponent._AZUL);

        aFaceRet.push(aLine);
        console.log("CuboComponent -> ngOnInit -> aFaceRet", aFaceRet)
        // ----------------------------------------------------------------
        break;
      case CuboComponent._FACE_AZUL: // 1 Azul
        aLine.push(CuboComponent._BRANCO);
        aLine.push(CuboComponent._VERMELHO);
        aLine.push(CuboComponent._VERDE);
        aFaceRet.push(aLine);

        aLine = [];
        // ----------------------------------------------------------------
        aLine.push(CuboComponent._AMARELO);
        aLine.push(CuboComponent._AZUL);
        aLine.push(CuboComponent._AMARELO);

        aFaceRet.push(aLine);
        aLine = [];
        // ----------------------------------------------------------------

        aLine.push(CuboComponent._AMARELO);
        aLine.push(CuboComponent._AMARELO);
        aLine.push(CuboComponent._AZUL);

        aFaceRet.push(aLine);
        console.log("CuboComponent -> ngOnInit -> aFaceRet", aFaceRet)
        // ----------------------------------------------------------------
        break;
      case CuboComponent._FACE_AMARELO: // 2 Amarela
        aLine.push(CuboComponent._VERMELHO);
        aLine.push(CuboComponent._LARANJA);
        aLine.push(CuboComponent._LARANJA);
        aFaceRet.push(aLine);

        aLine = [];
        // ----------------------------------------------------------------
        aLine.push(CuboComponent._VERMELHO);
        aLine.push(CuboComponent._AMARELO);
        aLine.push(CuboComponent._VERDE);

        aFaceRet.push(aLine);
        aLine = [];
        // ----------------------------------------------------------------

        aLine.push(CuboComponent._VERMELHO);
        aLine.push(CuboComponent._AZUL);
        aLine.push(CuboComponent._LARANJA);

        aFaceRet.push(aLine);
        console.log("CuboComponent -> ngOnInit -> aFaceRet", aFaceRet)
        // ----------------------------------------------------------------
        break;
      case CuboComponent._FACE_VERDE: // 3 Verde
        aLine.push(CuboComponent._AZUL);
        aLine.push(CuboComponent._AMARELO);
        aLine.push(CuboComponent._VERDE);
        aFaceRet.push(aLine);

        aLine = [];
        // ----------------------------------------------------------------
        aLine.push(CuboComponent._VERMELHO);
        aLine.push(CuboComponent._VERDE);
        aLine.push(CuboComponent._AZUL);

        aFaceRet.push(aLine);
        aLine = [];
        // ----------------------------------------------------------------

        aLine.push(CuboComponent._AZUL);
        aLine.push(CuboComponent._VERDE);
        aLine.push(CuboComponent._VERDE);

        aFaceRet.push(aLine);
        console.log("CuboComponent -> ngOnInit -> aFaceRet", aFaceRet)
        // ----------------------------------------------------------------
        break;
      case CuboComponent._FACE_LARANJA: // 4 Laranja
        aLine.push(CuboComponent._AMARELO);
        aLine.push(CuboComponent._AZUL);
        aLine.push(CuboComponent._BRANCO);
        aFaceRet.push(aLine);

        aLine = [];
        // ----------------------------------------------------------------
        aLine.push(CuboComponent._AZUL);
        aLine.push(CuboComponent._LARANJA);
        aLine.push(CuboComponent._BRANCO);

        aFaceRet.push(aLine);
        aLine = [];
        // ----------------------------------------------------------------

        aLine.push(CuboComponent._VERMELHO);
        aLine.push(CuboComponent._LARANJA);
        aLine.push(CuboComponent._LARANJA);

        aFaceRet.push(aLine);
        console.log("CuboComponent -> ngOnInit -> aFaceRet", aFaceRet)
        // ----------------------------------------------------------------
        break;
      case CuboComponent._FACE_VERMELHO: // 5 Vermelha
        aLine.push(CuboComponent._LARANJA);
        aLine.push(CuboComponent._VERDE);
        aLine.push(CuboComponent._VERMELHO);
        aFaceRet.push(aLine);

        aLine = [];
        // ----------------------------------------------------------------
        aLine.push(CuboComponent._BRANCO);
        aLine.push(CuboComponent._VERMELHO);
        aLine.push(CuboComponent._LARANJA);

        aFaceRet.push(aLine);
        aLine = [];
        // ----------------------------------------------------------------

        aLine.push(CuboComponent._BRANCO);
        aLine.push(CuboComponent._VERMELHO);
        aLine.push(CuboComponent._BRANCO);

        aFaceRet.push(aLine);
        console.log("CuboComponent -> ngOnInit -> aFaceRet", aFaceRet)
        // ----------------------------------------------------------------
        break;
      default:
        console.log("something wromg");
        break;
    }
    return aFaceRet;
  }
  move(i, j) {
    let cDirec = ''
    if (i === 1 || j === 1) {
      this.moveFace(i, j);
    }
    else {
      this.moveCol(i, j);

    }




  }
  private moveCol(i, j) {
    if (i == 0) {
      alert('move coluna' + j + ' pra cima')
    }
    else {
      alert('move coluna' + j + ' pra baixo')
    }


  }

  rolaDireita()
  {
    this.aCubo = this.giraMais45(this.aCubo, this.nSelect);
    for (let i = 0; i < this.aMapa[this.nSelect].length; i++) {
      if (i === this.aMapa[this.nSelect].length-1)
      {
        this.aCubo = this.giraMenus45(this.aCubo, this.aMapa[this.nSelect][i]);
      }
      else{
        this.aCubo = this.giraMais45(this.aCubo, this.aMapa[this.nSelect][i]);
      }
    }

    // this.aCubo = this.giraMenus45(this.aCubo, this.getBack(this.nSelect));
    // this.aCubo = this.giraMais45(this.aCubo, this.getUp(this.nSelect));
    // this.aCubo = this.giraMais45(this.aCubo, this.getDown(this.nSelect));
    // this.aCubo = this.giraMais45(this.aCubo, this.getLeft(this.nSelect));
    // this.aCubo = this.giraMais45(this.aCubo, this.getRight(this.nSelect));

    const myClonedArray  = new Array;

    console.log("CuboComponent -> constructor -> myClonedArray", myClonedArray)

    myClonedArray.push(this.aMapa[this.nSelect][CuboComponent._LEFT])
    myClonedArray.push(this.aMapa[this.nSelect][CuboComponent._RIGHT])
    myClonedArray.push(this.aMapa[this.nSelect][CuboComponent._UP])
    myClonedArray.push(this.aMapa[this.nSelect][CuboComponent._DOWN])
    myClonedArray.push(this.aMapa[this.nSelect][CuboComponent._BACK])


    this.aMapa[this.nSelect] = myClonedArray;


  }



  giraMais45(aCubo: [][][], nSelect,) {
    let aNewFace = new Array;
    let aRow = new Array;
    let aFace = aCubo[nSelect]

    for (let i = 0; i < aFace.length; i++) {
      for (let j = 0; j < aFace[i].length; j++) {
        aRow.push(aFace[aFace.length - j - 1][i])
      }
      aNewFace.push(aRow);
      aRow = new Array;
    }
    aCubo[nSelect] = aNewFace;
    return aCubo;
  }
  giraMenus45(aCubo: [][][], nSelect,) {
    let aNewFace = new Array;
    let aRow = new Array;
    let aFace = aCubo[nSelect]

    for (let i = 0; i < aFace.length; i++) {
      for (let j = 0; j < aFace[i].length; j++) {
        aRow.push(aFace[j][aFace[j].length - i - 1])
      }
      aNewFace.push(aRow);
      aRow = new Array;
    }
    aCubo[nSelect] = aNewFace;
    return aCubo;
  }

  private moveFace(i, j) {
    if (i === 1) {
      if (j == 0) {
        this.aCubo = this.giraMenus45(this.aCubo, this.nSelect);

      }
      else if (j == 2)
         this.rolaDireita();
      else {
        this.aCubo = this.giraMais45(this.aCubo, this.nSelect);
      }

    }
    else {
      if (i == 0) {
        alert('move face pra cima')
      }
      else if (i == 2)
        alert('move face pra baixo')
      else {
        alert('meio')
      }


    }

  }

}
