import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss']
})
export class PageErrorComponent implements OnInit {

  @Input() ctitulo = 'Problemas de conexao' ;
  @Input() imgErr = 'https://www.valuehost.com.br/blog/wp-content/uploads/2019/02/274034-erro-de-http-wordpress-como-corrigir-1170x508.jpg';
  @Input() bordimgerr = '#E95672';
  @Input() cMsg =  'Tente novamente mais tarde';



  constructor() { }

  ngOnInit() {
  }

}
