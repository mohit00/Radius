import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from '../../auth.service';
import {WebserModel} from '../../Service.model';
@Component({
  selector: 'app-command-dialog',
  templateUrl: './command-dialog.component.html',
  styleUrls: ['./command-dialog.component.scss']
})
export class CommandDialogComponent implements OnInit {
  constructor(private _bsModalRef: BsModalRef, private AuthService: AuthService, private WebserModel: WebserModel) {
    this.selectedList = [];
    this.data = {};
    this.page = 0;
    this.size = 5;
    this.sort = '';
    this.selectedPage = 1;
    this.dataList = [{
    class : 'col-md-4',
    class1: 'col-md-4',

    class2: 'col-md-4',
    class3: 'col-md-10',
    class4: 'plustbutton'

   }

  ];
    this.data = {};
  }

  public onClose: Subject<boolean>;
  public onCloseEdit: Subject<boolean>;

  title: any;
  id: any;
  data: any;
  dataList: any;
  displayList: any;
  selectedList: any;
  pageCountArray: any;
  selectedPage: any;
  nextDisabled: any;
 preDisabled: any;
 pageCount: any;
 page: any;
   size: any;
   sort: any;
  headerTitle: any;
  add() {
    this.dataList.push({
      class : 'col-md-4',
      class1: 'col-md-4',

      class2: 'col-md-4',
      class3: 'col-md-7' ,
      class4: 'plusbutonafter'
     } );
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
        console.log(JSON.stringify(this.selectedList[i]));
        this.data.commandFields = this.selectedList[i]._links.self.href ;
       }
    } else {
      alert('No Attribute selected');
      return false;
    }

  }
   this.AuthService.addCommandTemplate(this.data).subscribe(res => {
    this._bsModalRef.hide();
    this.onClose.next(true);

    this.AuthService.suceesAlertDialog('Command has been successfully created.' );
  });

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
         console.log(JSON.stringify(this.selectedList[i]));
         this.data.commandFields = this.selectedList[i]._links.self.href ;
        }
     } else {
       alert('No Attribute selected');
       return false;
     }
 
   }
   console.log(JSON.stringify(this.data));
    this.AuthService.updateCommandTemplate(this.data, this.WebserModel.Sevice.BASE_URL + 'commandTemplates/' + this.id).subscribe(res => {
      this._bsModalRef.hide();
      this.onCloseEdit.next(true);
      this.AuthService.suceesAlertDialog('Command has been successfully Updated.' );
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
   selectedListdata(data) {
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
      });    } else {
    const index =   this.selectedList.findIndex( record => record._links.self.href === data._links.self.href );
    this.selectedList.splice(index, 1);
  }
  }
  commandDetail() {
    this.selectedList = [];
    this.AuthService.getDetail(this.WebserModel.Sevice.BASE_URL + 'thing-service/commandTemplates/' + this.id).subscribe(res => {
       this.data = res;
       if (res.commandFields.id) {
        this.selectedList.push({
          _links: {
            self: {
              href: this.WebserModel.Sevice.BASE_URL + 'attributeTemplates/' + res.commandFields.id
            }
          }
        });
      }

       this.getAttributeList();

    });
  }
  public ngOnInit(): void {
    this.onClose = new Subject();
    this.onCloseEdit = new Subject();

    if (this.title == 'true') {
      this.headerTitle = 'Update Event';
      this.commandDetail();
     

    } else {
      this.getAttributeList();
      this.data.templateType = 'Schemafree';
      this.headerTitle = 'Add Event';

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
