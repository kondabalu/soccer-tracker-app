import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoccerTrackerComponent } from './src/soccer-tracker/soccer-tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    SoccerTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // constructor(library:FaIconLibrary){
  //   library.addIconPacks(fas,faR)
  // }
}
