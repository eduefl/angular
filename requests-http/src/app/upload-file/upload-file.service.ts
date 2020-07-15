import { tap } from 'rxjs/operators';
import { AlertModalService } from './../shared/alert-modal.service';
import { environment } from './../../environments/environment';
import { Registro } from './registro';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private readonly API_FILES = `${environment.API}files`;

  constructor(private http: HttpClient,
    private alertModalService: AlertModalService
  ) { }

  upload(files: Set<File>, url: string) {

    const formData = new FormData();

    files.forEach(file => formData.append('file', file, file.name));

    // const request  = new HttpRequest('POST', url, formData);

    // return this.http.request(request);

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    });

  }


  dowload(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json',

      // reportProgress
    });

  }

  list() {
    console.log(this.API_FILES);
    return this.http.get<Registro[]>(this.API_FILES)
      .pipe(
        tap(console.log)
      );

  }

  handleFile(res: any, fileName: string) {
    const file = new Blob([res],
      {
        type: res.type
      });

    // IE

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');

    link.href = blob;

    link.download = fileName;

    // link.click(); do not works on firefox
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));
    // timeout for firefox
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);

      link.remove();

    }, 100);


  }

}
