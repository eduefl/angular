import {  tap } from 'rxjs/operators';
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

  upload(files: Set<File>, url: string)  {

    const formData = new FormData();

    files.forEach(file => formData.append('file', file, file.name));

    // const request  = new HttpRequest('POST', url, formData);

    // return this.http.request(request);

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    });

  }




  list() {
    console.log(this.API_FILES);
    return this.http.get<Registro[]>(this.API_FILES)
      .pipe(
        tap(console.log)
      );

  }

}
