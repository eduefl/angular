import { Pipe, PipeTransform } from '@angular/core';
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let values = value.split(' ');
    let result = '';
    for (let v of values){
      result += this.capitalize(v) +' ';


    }

    return result;
  }

  capitalize(value: string){
    return value.substring(0,1).toUpperCase()+ value.substring(1).toLocaleLowerCase();  


  }



}
