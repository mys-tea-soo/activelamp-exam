import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule }                 from './app-routing.module';
import { AppComponent }                     from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule }                  from 'ngx-clipboard';

import { HomeComponent }    from './components/home/home.component';
import { HeaderComponent }  from './layout/header/header.component';
import { FooterComponent }  from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
