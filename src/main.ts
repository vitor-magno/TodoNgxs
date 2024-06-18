import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app/app.component';
import { UserState } from './shared/store/addUser/add-user.state';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      // Suas rotas aqui
    ]),
    provideHttpClient(),
    importProvidersFrom(NgxsModule.forRoot([UserState])),
  ],
}).catch((err) => console.error(err));
