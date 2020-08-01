import { AlertModalService } from './../../shared/alert-modal.service';
import { environment } from './../../../environments/environment';
import { Subscription, EMPTY, Subject, Observable } from 'rxjs';
import { UploadFileService } from './../upload-file.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEventType, HttpEvent, HttpClient } from '@angular/common/http';
import { take, catchError, delay, tap } from 'rxjs/operators';
import { Registro } from '../registro';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  queryField = new FormControl();
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
  lUpSel = true;
  lSeekSel = false;
  nTotal = 0;






  constructor(private uploadFileService: UploadFileService,
    private alertModalService: AlertModalService,
    private htpp: HttpClient,
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  cngTab(nOpc) {
    if (nOpc === 1) {
      this.lUpSel = true;
      this.lSeekSel = false;
    } else if (nOpc === 2) {
      this.lUpSel = false;
      this.lSeekSel = true;
    }

  }

  chkPane(nOpc) {
    {
      if (nOpc === 1) {
        if (this.lUpSel) { return 'tab-pane fade show active'; } else { return 'tab-pane fade'; }

      } else if (nOpc === 2) {
        if (this.lSeekSel) { return 'tab-pane fade show active'; } else { return 'tab-pane fade'; }

      }

    }

  }
  chkactive(nOpc) {
    if (nOpc === 1) {
      if (this.lUpSel) { return 'nav-link active'; } else { return 'nav-link'; }

    } else if (nOpc === 2) {
      if (this.lSeekSel) { return 'nav-link active'; } else { return 'nav-link'; }

    }

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
  onRefresh(ndelay = 0,  cValue = null) {
    this.obRegistro$ = this.uploadFileService.list(cValue)
      .pipe(
        tap(v =>  this.nTotal =  v.length ),
//        tap(console.log),
        delay(ndelay),
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          this.alertModalService.showAllertDanger('erro ao carregar os dados');
          return EMPTY;
        })
      );
      // this.obRegistro$
  }

  onSearch() {
    const value = this.queryField.value;

    this.onRefresh(0,  value);

  }

  baixa(filename, originalname) {

    const result = this.alertModalService.showConfirm(
      'Deseja baixar o arquivo ' + originalname, 'Dowload file' + originalname, 'Baixar', 'Cancelar', true, true);
    result.subscribe(lConf => {
      if (lConf) {
        this.Efctbaixa(filename, originalname);
      }
      result.unsubscribe();
    });
    return;
  }

  private Efctbaixa(filename, originalname) {
    this.uploadFileService.dowload(environment.BASE_URL + '/dowloadFile?file1=' + filename).
      subscribe((res: any) => {
        this.uploadFileService.handleFile(res, originalname);
      });
  }



  onDowloadExcel() {
    this.uploadFileService.dowload(environment.BASE_URL + '/dowloadExcel?color1=red&color2=blue').
      subscribe((res: any) => {
        this.uploadFileService.handleFile(res, 'toString.xlsx');
      });

  }

  onDowloadPdf() {
    this.uploadFileService.dowload(environment.BASE_URL + '/dowloadPDF?color1=PDF1&color2=blue').
      subscribe((res: any) => {
        this.uploadFileService.handleFile(res, 'TESTE.PDF');
      });

  }
  onUpload() {
    // Checkar https://stackoverflow.com/questions/57868537/post-collection-of-objects-in-json-server
    this.areg = [];
    this.ordemEProgresso = '0';
    this.lLoad = true;
    this.desinscreve();
    this.aLogs = [];
    //    let percent = 0;
    if (this.files && this.files.size > 0) {
      console.log(this.files);

      this.sub.push(this.uploadFileService.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          uploadProgress(progress => {
            // console.log (progress);
            // percent = progress;
            this.ordemEProgresso = progress + '%';
            this.aLogs.push('progresso ' + this.ordemEProgresso);
          }),
          filterResponse()
        )
        .subscribe(response => this.terminateUpload(response['message'])));
      // .subscribe((event: HttpEvent<Object>) => {
      //   if (event.type === HttpEventType.Response) {
      //     // console.log(event.body.message[0]);
      //     this.terminateUpload(event.body['message']);
      //   } else if (event.type === HttpEventType.UploadProgress) {
      //      percent = Math.round((event.loaded * 100) / event.total);
      //     this.ordemEProgresso = percent + '%';
      //     this.aLogs.push('progresso ' + this.ordemEProgresso);
      //   }
      // }
      // ));

    }

  }


  private terminateUpload(evBody) {
    console.log('upload concluido');
    evBody.forEach((message, n) => { // monto a lista para gerar o registro
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
    this.areg.forEach((reg, n) => { // inclui na lista de arquivos gravados
      // this.reg.file = event.body['message'][0].filename;
      this.create(reg).subscribe(
        () => {
          console.log('Incluido com sucesso');
          console.log(this.areg.length, n);
          if (n === (this.areg.length - 1)) {
            console.log('Atualizou');
            this.onRefresh(100);
            console.log(this.aLogs);
            this.lSucesso = true;
            setTimeout(() => { this.lLoad = false; }, this.nTimeOutBar);
            setTimeout(() => { this.lSucesso = false; }, this.nTimeOutDivSuc);
            this.alertModalService.showAllertSuccess('Arquivo Carregado Com SUcesso'
              , true, false
              // tslint:disable-next-line: max-line-length
              , 'https://w7.pngwing.com/pngs/574/549/png-transparent-computer-icons-peace-symbols-v-sign-symbol-miscellaneous-text-hand-thumbnail.png'
              , 'Load');
          }
        },
        () => this.alertModalService.showAllertDanger('Erro ao registrar arquivo'),
        () => console.log('arquivo registrado')
      );
    }
    );

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



