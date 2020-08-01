import { Component, OnInit } from '@angular/core';


// https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave

@Component({
  selector: 'app-cubo',
  templateUrl: './cubo.component.html',
  styleUrls: ['./cubo.component.scss']
})
export class CuboComponent implements OnInit {

  constructor() { }
  aFace1 = new Array;
  aLine  = new Array;


  ngOnInit() {

    this.aLine.push("rgb(10, 10, 102)");
    this.aLine.push("rgb(10, 10, 102)");
    this.aLine.push("rgb(10, 10, 102)");

    this.aFace1.push(this.aLine);

    this.aLine = [];

    this.aLine.push("rgb(10, 10, 102)");
    this.aLine.push("whitesmoke");
    this.aLine.push("orangered");

    this.aFace1.push(this.aLine);
    this.aLine = [];

    this.aLine.push("orangered");
    this.aLine.push("whitesmoke");
    this.aLine.push("green");

    this.aFace1.push(this.aLine);
    console.log("CuboComponent -> ngOnInit -> this.aFace1", this.aFace1)

  }


  getColor()
  {
    return "rgb(10, 10, 102)";
  }

}
