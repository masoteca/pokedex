import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, share } from "rxjs/operators";
import { Injectable } from '@angular/core';

@Injectable()

export class CacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<any>>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.method !== "GET") {
      return next.handle(req);
    }

    const CachedResponse = this.cache.get(req.url);
    if (CachedResponse) {
      //Si se pudo recuperar algo del cache, lo clonamos y lo retonarmos al componente
      return of(CachedResponse.clone());
    } else {
      //ejecutamos la request normalmente
      return next.handle(req).pipe(
        //genera cache si es posible y posterioremente compartimos con los componentes suscritos a esto (aunque solo deberia ser 1 )
        tap(response =>{ if (response instanceof HttpResponse) { this.cache.set(req.url, response.clone()); } }),
        share()
      );

    }

  }
}
