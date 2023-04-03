import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { MapService } from './services/map-service/map-service.service';
import { PopupService } from './services/popup-service/popup.service';
import { BoundariesService } from './services/boundaries/boundaries.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [MapService, PopupService, BoundariesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
