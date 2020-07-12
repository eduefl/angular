import { AlertModalService } from './../../shared/alert-modal.service';
import { environment } from './../../../environments/environment';
import { Subscription, EMPTY, Subject, Observable } from 'rxjs';
import { UploadFileService } from './../upload-file.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEventType, HttpEvent, HttpClient } from '@angular/common/http';
import { take, catchError } from 'rxjs/operators';
import { Registro } from '../registro';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {
  private readonly API_FILES = `${environment.API}files`;
  error$ = new Subject<boolean>();
  obRegistro$: Observable<Registro[]>;

  reg: Registro;
  areg: Registro[] = [];
  files: Set<File>;
  sub: Subscription[] = []; // to work with several subscriptions
  ordemEProgresso = '0';
  aLogs = [];
  lLoad = false;
  lSucesso = false;
  nTimeOutBar = 1000;
  nTimeOutDivSuc = 5250;



  constructor(private uploadFileService: UploadFileService,
    private alertModalService: AlertModalService,
    private htpp: HttpClient,
  ) { }

  ngOnInit() {
    this.onRefresh();
  }



  ngOnDestroy() {
    /*/  this.sub.forEach(s => {
        console.log(s);
        console.log('desinscreveu');
        s.unsubscribe();
      });
      /*/
    this.desinscreve();

  }

  private create(reg) {
    return this.htpp.post(this.API_FILES, reg).pipe(take(1));
  }


  private desinscreve() {
    this.sub.forEach(s => {
      console.log(s);
      console.log('desinscreveu');
      s.unsubscribe();
    });

    this.sub = [];
  }

  onchange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    // this.files = selectedFiles.length === 0 ? this.files = null : this.files = new Set();
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join('|');
    this.ordemEProgresso = '0';

  }
  onRefresh() {
    this.obRegistro$ = this.uploadFileService.list()
      .pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          this.alertModalService.showAllertDanger('erro ao carregar os dados');
          return EMPTY;
        })
      );
  }

  onUpload() {
    // Checkar https://stackoverflow.com/questions/57868537/post-collection-of-objects-in-json-server
    this.areg = [];
    this.ordemEProgresso = '0';
    this.lLoad = true;
    this.desinscreve();
    this.aLogs = [];
    if (this.files && this.files.size > 0) {
      console.log(this.files);

      this.sub.push(this.uploadFileService.upload(this.files, environment.BASE_URL + '/upload')
        .subscribe((event: HttpEvent<Object>) => {
          // HttpEventType
          // console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('upload concluido');
            // console.log(event.body.message[0]);
            console.log(event.body['message'][0].originalname);
            console.log(event.body['message'][0].filename);
            event.body['message'].forEach((message, n) => {
              console.log(message);
              console.log(n);
              this.reg = {
                id: null,
                originalname: message.originalname,
                filename: message.filename,
              };
              this.areg.push(this.reg);
            }
            );
            console.log(this.areg);
            this.areg.forEach((reg) => {
              // this.reg.file = event.body['message'][0].filename;
              this.create(reg).subscribe(
                () => {
                  console.log('Incluido com sucesso');
                  this.onRefresh();


                },
                () => this.alertModalService.showAllertDanger('Erro ao registrar arquivo'),
                () => console.log('arquivo registrado')
              );
            }
            );
            console.log(this.aLogs);
            this.lSucesso = true;
            setTimeout(() => { this.lLoad = false; }, this.nTimeOutBar);
            setTimeout(() => { this.lSucesso = false; }, this.nTimeOutDivSuc);
            this.alertModalService.showAllertSuccess('Arquivo Carregado Com SUcesso'
              , true, false
              // tslint:disable-next-line: max-line-length
              , 'https://w7.pngwing.com/pngs/574/549/png-transparent-computer-icons-peace-symbols-v-sign-symbol-miscellaneous-text-hand-thumbnail.png'
              , 'Load');
          } else if (event.type === HttpEventType.UploadProgress) {
            const percent = Math.round((event.loaded * 100) / event.total);
            this.ordemEProgresso = percent + '%';
            this.aLogs.push('progresso ' + this.ordemEProgresso);
          }

        }
        ));

    }

  }





  private unpercent(porcentagen) {
    return Number(porcentagen.replace('%', ''));

  }

  private between(nMin, nMax) {
    return this.unpercent((this.ordemEProgresso)) >= nMin && this.unpercent((this.ordemEProgresso)) < nMax;

  }


  vProgress(cstaus) {
    let lRet = false;

    if (cstaus === 1 && this.between(0, 99)) {
      lRet = true;
    }
    if (cstaus === 2 && (this.unpercent((this.ordemEProgresso)) === 100)) {
      lRet = true;
    }


    return lRet;

  }
}



