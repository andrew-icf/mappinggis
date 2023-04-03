import { MapService } from '../services/map-service/map-service.service';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { BoundariesService } from './../services/boundaries/boundaries.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private states: any;

  private initMap() {
    this.map = L.map('map', {
      center: [39.7392, -104.9903],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private mapService: MapService, private boundariesService: BoundariesService) {}

  ngAfterViewInit(): void {
    this.initMap();
    // this.mapService.makeCapitalMarkers(this.map);
    this.mapService.makeCapitalCircleMarkers(this.map);
    this.boundariesService.getStateBoundary().subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    })
  }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.3,
        fillColor: '#6DB65B'
      }),
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: (e) => (this.highLightFeature(e)),
          mouseout: (e) => (this.resetFeature(e))
        })
      }
    });

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }

  private highLightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 4,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#3487FB'
    });
  }

  private resetFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }

}
