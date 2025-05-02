import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { ListagemCompradoresComponent } from './comprador/pages/listagem-compradores/listagem-compradores.component';
import { CadastroCompradorComponent } from './comprador/pages/cadastro-comprador/cadastro-comprador.component';
import { CompradorComponent } from './comprador/comprador.component';
import { EditarCadastroComponent } from './comprador/pages/editar-cadastro/editar-cadastro.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { RodapeComponent } from './layout/rodape/rodape.component';
import { MY_DATE_FORMATS } from './shared/formatador-data';

@NgModule({
  declarations: [
    AppComponent,
    ListagemCompradoresComponent,
    CadastroCompradorComponent,
    CompradorComponent,
    EditarCadastroComponent,
    HomePageComponent,
    ToolbarComponent,
    RodapeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    CdkStepperModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // define a localização
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // aplica os formatos
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
