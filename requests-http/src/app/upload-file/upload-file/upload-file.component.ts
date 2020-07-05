import { environment } from './../../../environments/environment';
import { Subscription } from 'rxjs';
import { UploadFileService } from './../upload-file.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  files: Set<File>;
  sub: Subscription[] = []; // to work with several subscriptions
  ordemEProgresso = '0';


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
    this.ordemEProgresso = '0' ;

  }
  onUpload() {
    this.desinscreve();
    if (this.files && this.files.size > 0) {
      console.log(this.files);

      this.sub.push(this.uploadFileService.upload(this.files, environment.BASE_URL +  '/upload')
        .subscribe((event: HttpEvent<Object>) => {
          // HttpEventType

        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('upload concluido');
        } else if (event.type === HttpEventType.UploadProgress) {
          const percent = Math.round((event.loaded * 100) / event.total);
          console.log('progresso', percent);
          this.ordemEProgresso = percent + '%';
        }

      }
        ));

    }

  }
}
