import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from '../../auth.service';
import {WebserModel} from '../../Service.model';
@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

  public onClose: Subject<boolean>;
  public onCloseEdit: Subject<boolean>;

  headerTitle: String;
  data: any;
  dataList: any;
  displayList: any;
  selectedList: any;
  title: any;
  id: any;
  pageCountArray: any;
 selectedPage: any;
 nextDisabled: any;
preDisabled: any;
pageCount: any;
page: any;
  size: any;
  sort: any;
  constructor(private WebserModel: WebserModel, private _bsModalRef: BsModalRef, private AuthService: AuthService ) {
    this.selectedList = [];
    this.data = {};
    this.page = 0;
    this.size = 5;
    this.sort = '';
    this.selectedPage = 1;
  }
  add() {
    this.dataList.push({
      class : 'col-md-4',
      class1: 'col-md-4',

      class2: 'col-md-4',
      class3: 'col-md-7' ,
      class4: 'plusbutonafter'
     } );
  }
  selectedListdata(data: { check: boolean; _links: { self: { href: any; }; }; }) {
    for (let i = 0 ; i < this.displayList.length; i++) {
      if (this.displayList[i]._links.self.href != data._links.self.href) {
        this.displayList[i].check =  false;
        }
       }
    data.check = ! data.check;

    this.selectedList = [];

    if (data.check) {
      this.selectedList.push({
        _links: {
          self: {
            href: data._links.self.href
          }
        }
      });
    } else {
    const index =   this.selectedList.findIndex( record => record._links.self.href === data._links.self.href );
    this.selectedList.splice(index, 1);
  }
    }
  submitUpdate() {
    this.data.createdBy = 'admin';
    this.data.lastUpdatedBy = 'admin';
    this.data.tenantId = 'Radius-PF';
    this.data.isFreeze = false;
    if (this.data.templateType === 'schemaDefine') {
      if (this.selectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
         for (let i = 0 ; i < this.selectedList.length ; i ++) {
           this.data.eventFields = this.selectedList[i]._links.self.href ;
         }
      } else {
        alert('No Attribute selected');
        return false;
      }

    }
     this.AuthService.updateEventTemplate(this.data, this.WebserModel.Sevice.BASE_URL + 'eventTemplates/' + this.id).subscribe(res => {
      this._bsModalRef.hide();
      this.onCloseEdit.next(true);

      this.AuthService.suceesAlertDialog('Event has been successfully created.' );
    });

  }
  submitCreate() {


    this.data.createdBy = 'admin';
    this.data.lastUpdatedBy = 'admin';
    this.data.tenantId = 'Radius-PF';
    this.data.isFreeze = false;
    if (this.data.templateType === 'schemaDefine') {
      if (this.selectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
        for (let i = 0 ; i < this.selectedList.length ; i ++) {
           this.data.eventFields = this.selectedList[i]._links.self.href ;
         }
      } else {
        alert('No Attribute selected');
        return false;
      }

    }
    this.AuthService.addEventTemplate(this.data).subscribe(res => {
      this._bsModalRef.hide();
      this.onClose.next(true);

      this.AuthService.suceesAlertDialog('Event has been successfully created.' );
    });

  }
  remove(index) {
    this.dataList.splice(index, 1);
  }
  getAttributeList() {
    this.AuthService.getAttributeTemplate(this.page, this.size, this.sort).subscribe(res => {
      this.pageCount =  res.page.totalPages;

      if (this.pageCount == this.page + 1) {
        this.nextDisabled = true;
      } else {
        this.nextDisabled = false;

      }

      if (this.page   == 0) {
        this.preDisabled = true;
      } else {
        this.preDisabled = false;

      }
      this.displayList = res._embedded.attributeTemplates;
      this.pageCountArray = [];
      for (let i = 0 ; i < this.pageCount; i++) {
      this.pageCountArray.push(i + 1);
    }
      if (this.selectedList.length > 0) {
     const indexselected =   this.displayList.findIndex( record => record._links.self.href === this.selectedList[0]._links.self.href );


     this.displayList[indexselected].check = true;


    }

    });

  }
  eventDetail() {
    this.AuthService.getDetail(this.WebserModel.Sevice.BASE_URL + 'thing-service/eventTemplates/' + this.id).subscribe(res => {
      console.log(JSON.stringify(res));

      this.data = res;
      this.selectedList.push({
        _links: {
          self: {
            href: this.WebserModel.Sevice.BASE_URL + 'attributeTemplates/' + res.eventFields.id
          }
        }
      });
      this.getAttributeList();

    });
  }
  public ngOnInit(): void {
      this.onClose = new Subject();
      this.onCloseEdit = new Subject();
      if (this.title === 'false') {
        this.getAttributeList();

        this.headerTitle = 'Add Event';
        this.data = {templateType: 'Schemafree'};
  } else {
    this.headerTitle = 'Update Event';

    this.eventDetail();
  }
    }
  public onConfirm(): void {
      this.onClose.next(true);
      this._bsModalRef.hide();
  }

  public onCancel(): void {
      this.onClose.next(false);
      this._bsModalRef.hide();
  }
  prePage() {

    this.selectedPage = this.selectedPage - 1;
    this.page = this.selectedPage - 1 ;
    this.getAttributeList();


}
Page(data) {
   this.selectedPage = data ;
   this.page = this.selectedPage - 1;
   this.getAttributeList();
}
  nextPage() {

      this.selectedPage = this.selectedPage + 1;
      this.page = this.selectedPage - 1;
      this.getAttributeList();

  }
  getClass(data) {
    if (this.selectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }
}
