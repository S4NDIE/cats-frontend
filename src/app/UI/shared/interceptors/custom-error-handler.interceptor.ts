import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../components/app-loading/services/loading.service';
import Swal from 'sweetalert2';
import { LoginUseCase } from 'src/app/domain/usecase/loginusercase';

@Injectable()
export class CustomErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private _loadingService: LoadingService,
    private _toastr: ToastrService,
    private _loginUsercase: LoginUseCase
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loadingService.startLoading();

    return next.handle(request).pipe(
      catchError(this.errorHandling.bind(this)),
      finalize(() => {
        this._loadingService.stopLoading();
      })
    );
  }

  errorHandling(error: HttpErrorResponse): Observable<never> {
    return throwError(() => {
      if (error.status === 0) {
        this._toastr.error('No se puede realizar la conexión al api');
        this._loginUsercase.logout();
        return null;
      }
      if (error.status === 400) {
        let messageError = '';
        if (error.error.errors) {
          for (let errorProcess of error.error.errors) {
            messageError += `<p>${errorProcess}<p>`;
          }
        }
        Swal.fire({
          title: messageError,
          icon: 'error',
        });
        return null;
      }
      if (error.status === 401 || error.status === 403) {
        Swal.fire({
          title:
            'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión para continuar',
          icon: 'error',
        });
        this._loginUsercase.logout();
        return null;
      }
      const errorFactory = new Error(
        `Ocurrió un error - ${error.error.message}`
      );
      this._toastr.error(errorFactory.message);
      return errorFactory;
    });
  }
}
