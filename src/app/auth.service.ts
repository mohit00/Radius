import { Injectable,EventEmitter } from '@angular/core';
import {

  Headers,
  RequestOptions
} from '@angular/http';
import { HttpClient , HttpInterceptor} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {WebserModel} from './Service.model';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {SuccessDialogComponent} from './dialog/success-dialog/success-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loaderCheck = new EventEmitter<any>();

  bsModalRef: BsModalRef;
  BASE_URL = this.WebserModel.Sevice.BASE_URL
     public loading = false;

  private missionAnnouncedSource = new Subject<string>();
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  CREATE_ATTRIBUTE_TEMPLATE = this.WebserModel.Sevice.CREATE_ATTRIBUTE_TEMPLATE;
  firstHeaders: any;
  
// tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private router: Router, private modalService: BsModalService
// tslint:disable-next-line: no-shadowed-variable
    ,         private WebserModel: WebserModel) {

// tslint:disable-next-line: deprecation
      this.firstHeaders = new Headers();
      this.firstHeaders.append('Content-Type', 'application/json');

  }

  suceesAlertDialog(data ) {
    const initialState = {
      title: data, 
    };

    this.bsModalRef = this.modalService.show(SuccessDialogComponent, {initialState, class: 'modal-confirm  modal-sm' }    );

    this.bsModalRef.content.onClose.subscribe(result => {
     console.log('results', result);
      });

    }

   login( ): Observable < any > {

     return this._http.get( '/api/rest/v2/all', {

     })
    .map(res => res as any)
    .catch(this.handleError);

       }
       addAttributeTemplate(data): Observable < any > {

        return this._http.post( this.BASE_URL + 'attributeTemplates', data)
       .map(res => res as any)
       .catch(this.handleError);
       }
       updateAttributeTemplate(data, id): Observable < any > {
   
        return this._http.put( id, data)
       .map(res => res as any)
       .catch(this.handleError);
       }
       getAttributeTemplate( page, size, sort): Observable < any > {

        return this._http.get( this.BASE_URL + 'attributeTemplates?page=' + page + '&size=' + size + '&sort=' + sort )
       .map(res => res as any)
       .catch(this.handleError);
       }
       getAttributeTemplateDetail( data): Observable < any > {

        return this._http.get( this.BASE_URL + 'attributeTemplates/' + data)
       .map(res => res as any)
       .catch(this.handleError);
       }
       setId(data, state){
         localStorage.setItem('Id', data);
         this.router.navigate([state]);
        }
  get  getId(){
          return localStorage.getItem('Id');
          
         }
       getEventTemplate( page, size, sort): Observable < any > {

        return this._http.get( this.BASE_URL + 'eventTemplates?page=' + page + '&size=' + size + '&sort=' + sort)
       .map(res => res as any)
       .catch(this.handleError);
       }
       getEventTemplateDetail(data ): Observable < any > {

        return this._http.get( this.BASE_URL + 'eventTemplates/' + data )
       .map(res => res as any)
       .catch(this.handleError);
       }
       addEventTemplate(data): Observable < any > {
        return this._http.post(this.BASE_URL +  'eventTemplates', data)
       .map(res => res as any)
       .catch(this.handleError);
       }
       updateEventTemplate(data, id): Observable < any > { 
        return this._http.put( id, data)
       .map(res => res as any)
       .catch(this.handleError);
       }
       updateCommandTemplate(data: any, id: string): Observable < any > { 
        return this._http.put( id, data)
       .map(res => res as any)
       .catch(this.handleError);
       }
       addCommandTemplate(data): Observable < any > {

        return this._http.post(this.BASE_URL +  'commandTemplates', data)
       .map(res => res as any)
       .catch(this.handleError);
       }
       getComandTemplate(page: string, size: string, sort: string ): Observable < any > {

        return this._http.get( this.BASE_URL + 'commandTemplates?page=' + page + '&size=' + size + '&sort=' + sort )
       .map(res => res as any)
       .catch(this.handleError);
       }
       getComandTemplateDetail(data ): Observable < any > {

        return this._http.get(this.BASE_URL +  'commandTemplates/' + data )
       .map(res => res as any)
       .catch(this.handleError);
       }
       getdeviceTemplate( ): Observable < any > {

        return this._http.get( this.BASE_URL + 'thingTemplates' )
       .map(res => res as any)
       .catch(this.handleError);
       }
       adddeviceTemplate(data ): Observable < any > {

        return this._http.post( this.BASE_URL + 'thingTemplates', data)
       .map(res => res as any)
       .catch(this.handleError);
       }
       updatedeviceTemplate(data , id): Observable < any > {

        return this._http.post(id, data)
       .map(res => res as any)
       .catch(this.handleError);
       }
       getDetail(data ): Observable < any > {

        return this._http.get( data )
       .map(res => res as any)
       .catch(this.handleError);
       }
       getthingList( ): Observable < any > {

        return this._http.get( this.BASE_URL + 'things' )
       .map(res => res as any)
       .catch(this.handleError);
       }
       addThing( data: any): Observable < any > {

        return this._http.get( this.BASE_URL + 'thing-service/createThingFromTemplate/'+data )
       .map(res => res as any)
       .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.log(error);
        this.loading = false;

        return Observable.throw(error);
      }
}
