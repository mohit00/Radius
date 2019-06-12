import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import {AuthService} from '../../auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-device-provisioning-dialog',
  templateUrl: './device-provisioning-dialog.component.html',
  styleUrls: ['./device-provisioning-dialog.component.scss']
})
export class DeviceProvisioningDialogComponent implements OnInit {
  constructor(private Service: AuthService,
// tslint:disable-next-line: variable-name
              private _bsModalRef: BsModalRef,
   ) {

    this.selectedList = [];
    this.data = {metadata: {}};
    this.page = 0;
    this.size = 5;
    this.sort = '';
    this.selectedPage = 1;
   }
  public onClose: Subject<boolean>;

  pageCountArray: any;
  selectedPage: any;
  nextDisabled: any;
 preDisabled: any;
 pageCount: any;
 page: any;
 selectedList: any;
eventTemplateList: any;
data: any;
size: any;
sort: any;
title: any;
 id: any;
 geteventTemplate() {
   this.Service.getdeviceTemplate().subscribe(res => {
     this.eventTemplateList = res._embedded.thingTemplates;
     this.pageCount =  res.page.totalPages;

     if (this.pageCount === this.page + 1) {
       this.nextDisabled = true;
     } else {
       this.nextDisabled = false;

     }

     if (this.page   === 0) {
       this.preDisabled = true;
     } else {
       this.preDisabled = false;
     }
     this.pageCountArray = [];
     for (let i = 0 ; i < this.pageCount; i++) {
     this.pageCountArray.push(i + 1);
   }
     if (this.selectedList.length > 0) {
    const indexselected =   this.eventTemplateList.findIndex( record => record._links.self.href === this.selectedList[0]._links.self.href );
    this.eventTemplateList[indexselected].check = true;


   }

   });
 }
 updateDevicePro() {

  if (this.selectedList.length > 0 ) {
    this.Service.updateThing( this.selectedList[0]._links.self.href.substr(this.selectedList[0]._links.self.href.length - 2), this.data).subscribe(res => {
      this.onClose.next(true);
      this._bsModalRef.hide();
      this.Service.suceesAlertDialog('Device/Provisioning');

    });

       } else {
      alert('Please Select Things Template');
   }
 }
 createDevicePro() {
    if (this.selectedList.length > 0 ) {
    this.Service.addThing( this.selectedList[0]._links.self.href.substr(this.selectedList[0]._links.self.href.length - 2), this.data).subscribe(res => {
      this.onClose.next(true);
      this._bsModalRef.hide();
      this.Service.suceesAlertDialog('Device/Provisioning');

    });

       } else {
      alert('Please Select Things Template');
   }
 }
getDetailDeviceProvisioning() {
 this.Service.getDetail(this.id).subscribe(res => {
  console.log(JSON.stringify(res));
  this.data = res;
});
}
  ngOnInit() {
    this.onClose = new Subject();

    this.geteventTemplate();
    if (this.title === 'false') {

    } else {
      this.getDetailDeviceProvisioning();
    }

  }
  prePage() {

    this.selectedPage = this.selectedPage - 1;
    this.page = this.selectedPage - 1 ;
    this.geteventTemplate();


}
selectedListdata(data: { check: boolean; _links: { self: { href: any; }; }; }) {
  for (let i = 0 ; i < this.eventTemplateList.length; i++) {
    if (this.eventTemplateList[i]._links.self.href != data._links.self.href) {
      this.eventTemplateList[i].check =  false;
      }
     }
  data.check = ! data.check;

  this.selectedList = [];

  if (data.check) {
    this.selectedList.push(data);
  } else {
  const index =   this.selectedList.findIndex( record => record._links.self.href === data._links.self.href );
  this.selectedList.splice(index, 1);
}
 }
Page(data: any) {
   this.selectedPage = data ;
   this.page = this.selectedPage - 1;
   this.geteventTemplate();
}
  nextPage() {

      this.selectedPage = this.selectedPage + 1;
      this.page = this.selectedPage - 1;
      this.geteventTemplate();

  }
  getClass(data: any) {
    if (this.selectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }
}
