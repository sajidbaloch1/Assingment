import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import {  CheckboxModule } from 'primeng/checkbox';
import {  DialogModule } from 'primeng/dialog';
import {  MenubarModule } from 'primeng/menubar';
import {  ConfirmPopupModule } from 'primeng/confirmpopup';
import {  ToolbarModule } from 'primeng/toolbar';
import {  ToastModule } from 'primeng/toast';
import {  TableModule } from 'primeng/table';
import { LoginComponent } from './auth/login/login.component';
import { FilmsComponent } from './pages/films/films.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FilmsComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    CheckboxModule,
    MenubarModule,
    HttpClientModule,
    DialogModule,
    TableModule,
    ToolbarModule,
    ConfirmPopupModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
