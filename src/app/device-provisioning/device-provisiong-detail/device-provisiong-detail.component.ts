import { Component, OnInit } from '@angular/core';
import {WebserModel} from '../../Service.model';
import {AuthService} from '../../auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ChangeStatusComponent} from '../../change-status/change-status.component'
import {MigrateDialogComponent} from '../../migrate-dialog/migrate-dialog.component'
import {AddFieldDialogComponent } from '../../add-field-dialog/add-field-dialog.component'

@Component({
  selector: 'app-device-provisiong-detail',
  templateUrl: './device-provisiong-detail.component.html',
  styleUrls: ['./device-provisiong-detail.component.scss']
})
export class DeviceProvisiongDetailComponent implements OnInit {
  ComandId: any;
  ComandDetail: any;
  bsModalRef: BsModalRef;

// tslint:disable-next-line: no-shadowed-variable
  constructor(private modalService: BsModalService,private WebserModel: WebserModel, private Service: AuthService) { }
  getDetailEvent() {
    this.ComandId  =  this.Service.getId;
    this.Service.getDetail(this.ComandId).subscribe(res => {
      console.log(JSON.stringify(res));
      this.ComandDetail = res;
    });
     }
     changeStatus(data){
 
      const initialState = {
        title: 'false',
        data:data
      };
      this.bsModalRef = this.modalService.show(ChangeStatusComponent,  {initialState, class: 'gray modal-lg' });
  
      this.bsModalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.getDetailEvent();
  });
     }
     migrate(data){
       
 
      const initialState = {
        title: 'false',
        data:data
      };
      this.bsModalRef = this.modalService.show(MigrateDialogComponent,  {initialState, class: 'gray modal-lg' });
  
      this.bsModalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.getDetailEvent();
  });
     }
     addField(data){

 
      const initialState = {
        title: 'false',
        data:data
      };
      this.bsModalRef = this.modalService.show(AddFieldDialogComponent,  {initialState, class: 'gray modal-lg' });
  
      this.bsModalRef.content.onClose.subscribe(result => {
        console.log('results', result);
        this.getDetailEvent();
  });
     }
  ngOnInit() {
    this.getDetailEvent();
  }

}
