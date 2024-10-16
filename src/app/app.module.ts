import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { DefaultComponent } from './UI/layouts/default/default.component';
import { MenuSideComponent } from './UI/shared/components/menu-side/menu-side.component';
import { LoginGateway } from './domain/models/login/gateway/login-gateway';
import { LoginService } from './infraestructure/driven-adapter/services/login/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BreedGateway } from './domain/models/breed/gateway/breed-gateway';
import { BreedService } from './infraestructure/driven-adapter/services/breed/breed.service';
import { AppLoadingModule } from './UI/shared/components/app-loading/app-loading.module';
import { CustomErrorHandlerInterceptor } from './UI/shared/interceptors/custom-error-handler.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './infraestructure/driven-adapter/services/user/user.service';
import { UserGateway } from './domain/models/user/gateway/user-gateway';

@NgModule({
  declarations: [AppComponent, DefaultComponent],
  imports: [
    HttpClientModule,
    MenuSideComponent,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppLoadingModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [
    { provide: LoginGateway, useClass: LoginService },
    { provide: BreedGateway, useClass: BreedService },
    { provide: UserGateway, useClass: UserService },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
