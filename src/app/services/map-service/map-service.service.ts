import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './../popup-service/popup.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  capitals: string = '/assets/data/usa-capitals.geojson';
  
  constructor(
    private httpClient: HttpClient,
    private popupService: PopupService
    ) { }
  
  makeCapitalMarkers(map: any): void {
    this.httpClient.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]); 
        marker.bindPopup(this.popupService.makeCapitolPopup(c.properties));
        marker.addTo(map);
      }
    });
  }
  
  makeCapitalCircleMarkers(map: any): void {
    this.httpClient.get(this.capitals).subscribe((res: any) => {
      const maxPopulation = Math.max(...res.features.map(cap => cap.properties.population))

      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], {
          radius: this.scaledRadius(c.properties.population, maxPopulation)
        });
        circle.bindPopup(this.popupService.makeCapitolPopup(c.properties));

        circle.addTo(map);
      }
    });
  }

  scaledRadius(value: number, maxValue: number): number {
    return 20 * ( value / maxValue )
  }

  fetchMap() {
    // Add BE call here
    // return this.httpClient.get().pipe(
    //   map((res: any) => console.log)
    // )
  }
}
