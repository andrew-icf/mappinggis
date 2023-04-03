import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoundariesService {

  constructor(private httpClient: HttpClient) { }

  getStateBoundary(): any {
    return this.httpClient.get('/assets/data/boundary.json');
  }
}
