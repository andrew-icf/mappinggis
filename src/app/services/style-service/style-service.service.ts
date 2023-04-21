import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }

  stateStyle = {
    initialFeature: {
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.3,
      fillColor: '#6DB65B'
    },
    resetFeature: {
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    },
    highLightFeature: {
      weight: 4,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#3487FB'
    }
  }
}
