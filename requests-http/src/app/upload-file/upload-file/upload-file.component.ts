import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit() {
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

  }
  onUpload()
  {
    if(this.files && this.files.size > 0){
      console.log(this.files);

      this.uploadFileService.upload(this.files,'http://localhost:8000/upload')
        .subscribe(response=> {console.log('upload concluido');
        console.log(response);}
        );

    }

  }
}
