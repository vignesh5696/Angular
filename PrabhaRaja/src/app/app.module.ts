import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoetCardComponent } from './poet-card/poet-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MainPageComponent } from './main-page/main-page.component';
import { NewPoemComponent } from './new-poem/new-poem.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './shared/alert/alert.component';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { PoemReadViewComponent } from './poem-read-view/poem-read-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PoetCardComponent,
    MainPageComponent,
    NewPoemComponent,
    AlertComponent,
    ConfirmationComponent,
    SpinnerComponent,
    AuthComponent,
    AboutMeComponent,
    PlaceholderDirective,
    PoemReadViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
