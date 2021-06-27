import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoetCardComponent } from './poet-card/poet-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MainPageComponent } from './main-page/main-page.component';
import { NewPoemComponent } from './new-poem/new-poem.component';

@NgModule({
  declarations: [
    AppComponent,
    PoetCardComponent,
    MainPageComponent,
    NewPoemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
