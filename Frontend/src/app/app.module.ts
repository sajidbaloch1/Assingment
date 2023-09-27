import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import {  CheckboxModule } from 'primeng/checkbox';
import {  MenubarModule } from 'primeng/menubar';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CheckboxModule
    ,MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
