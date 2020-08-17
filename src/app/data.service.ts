import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  document:object = null;

  writeDocument(obj:object){
    this.document = obj;
  }

  readDocument(){
    return this.document;
  }
}
