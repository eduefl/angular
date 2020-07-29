import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  total = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSearch() {
    const fields = 'name,filename,version,description,homepage';
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {

      const params_ = {
        search: value,
        fields: fields
      };

      // example of original query
    // https://api.cdnjs.com/libraries?fields=name,filename,version,description,homepage&search=angular

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);



      // this.results$ = this.http.get(this.SEARCH_URL,{ params: params } )
      console.log('LibSearchComponent -> onSearch -> params', params);
       this.results$ = this.http.get(this.SEARCH_URL, {  params } )
      .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        );
      console.log('LibSearchComponent -> onSearch -> this.queryField.value', this.queryField.value);
    }
  }

}
