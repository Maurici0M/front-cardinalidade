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

import { ListagemCompradoresComponent } from './comprador/pages/listagem-compradores/listagem-compradores.component';
import { CadastroCompradorComponent } from './comprador/pages/cadastro-comprador/cadastro-comprador.component';
import { CompradorComponent } from './comprador/comprador.component';
import { EditarCadastroComponent } from './comprador/pages/editar-cadastro/editar-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    ListagemCompradoresComponent,
    CadastroCompradorComponent,
    CompradorComponent,
    EditarCadastroComponent,
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
    MatButtonModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
