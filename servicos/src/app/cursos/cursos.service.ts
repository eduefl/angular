import { LogService } from './../shared/log.service';
import { Injectable, EventEmitter } from "@angular/core";


@Injectable()
export class CursosService{

    emitirCursoCriado          = new EventEmitter<string>();
    static criouNovoCurso      = new EventEmitter<string>();

    private cursos: string[] = ['angular 2' , 'Java', 'Phonegap'];

    constructor(private logService: LogService){

        console.log('cursos service iniciado')
    }    
    getCursos(){
        this.logService.consoleLog(`obtendo lista com os valores ${this.cursos}`  )
        return this.cursos;

    }

    addcurso(curso: string){
        this.logService.consoleLog(`Add o curso  ${curso}`  )
        
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);

    }


}