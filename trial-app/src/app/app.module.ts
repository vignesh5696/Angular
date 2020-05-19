import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { MyworksComponent } from './myworks/myworks.component';
import { ExtraworksComponent } from './extraworks/extraworks.component';
import { ProfessionalWorksComponent } from './professional-works/professional-works.component';
import { EduComponent } from './edu/edu.component';
import { TimelineComponent } from './shared/timeline/timeline.component';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    ContactComponent,
    MyworksComponent,
    ExtraworksComponent,
    ProfessionalWorksComponent,
    EduComponent,
    TimelineComponent,
    AuthComponent,
    SpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
