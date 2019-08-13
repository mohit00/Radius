import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import {AuthService} from '../auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private AuthService: AuthService) {
    }
    authReq:any;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      setTimeout(()=>{
        this.AuthService.loaderCheck.emit('show');
      },10)
      if(req.url !='Login'){
        this.authReq = req.clone({
          setHeaders: {
            'x-account': 'Radius-PF',
            'x-user':'admin'
          }
        });
      }else{
        this.authReq = req;
      }
      return next.handle(this.authReq).do(evt => {
      if (evt instanceof HttpResponse) {
        console.log('end');
        setTimeout(()=>{
          this.AuthService.loaderCheck.emit('hide');
        },10)
        console.log('---> status:', evt.status);
       }
    });
  }
}
