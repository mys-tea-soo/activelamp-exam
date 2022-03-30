import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule }                 from './app-routing.module';
import { AppComponent }                     from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HomeComponent }    from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { HeaderComponent }  from './layout/header/header.component';
import { FooterComponent }  from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
