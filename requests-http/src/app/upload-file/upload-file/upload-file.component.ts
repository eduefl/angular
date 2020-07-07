import { environment } from './../../../environments/environment';
import { Subscription, of, EMPTY, Subject } from 'rxjs';
import { UploadFileService } from './../upload-file.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { delay, tap, flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  files: Set<File>;
  sub: Subscription[] = []; // to work with several subscriptions
  ordemEProgresso = '0';
  aLogs = [];
  lLoad = false;


  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit() {
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
  onUpload() {
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
            console.log(this.aLogs);

            setTimeout(() => { this.lLoad = false; }, 5000);
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
     if (cstaus === 2 && (this.unpercent((this.ordemEProgresso))===100)) {
      lRet = true;
    }


    return lRet;

  }
}



