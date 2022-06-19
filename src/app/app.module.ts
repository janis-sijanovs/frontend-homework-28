import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { CharacterComponent } from './character-list/character/character.component';
import { LocationComponent } from './location-list/location/location.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    LocationListComponent,
    CharacterComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
