import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import Stepper from 'bs-stepper';
import {AccountService} from '../../account.service';
import { BsModalRef } from 'ngx-bootstrap';
@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit {
  private stepper: Stepper;
  public onClose: Subject<boolean>;
  data: any = {accountContact: {}, userInfo: {},
  type: '1', parentAccount: '1'};
  contactUser: any = [];
  constructor(private Service: AccountService, private _bsModalRef: BsModalRef) { }
  dataList: any;
  title: any;
  page: any;
  size: any;
  sort: any;
  ListSelect: any;
  add() {
    this.dataList.push({
      type: '1',
      class : 'col-md-6',
      class1: 'col-md-6',
      class2: 'col-md-6',
      class3: 'col-md-8' ,
      class4: 'plusbutonafter',
      class5: 'col-md-2',
     } );
   }
   getAccountList() {
    this.Service.AccountDataGet(this.page, this.size, this.sort).subscribe(res => {
         this.ListSelect = res._embedded.accounts;
         console.log(JSON.stringify(this.ListSelect));
     });
  }
  remove(index) {
    this.dataList.splice(index, 1);
  }
  AddUsernext() {
    this.contactUser.push({
      name: 'User'
    });
  }
  RemoveUser(index) {
    this.contactUser.splice(index, 1);

  }
  ngOnInit() {
    this.getAccountList();
    if (this.title === 'false') {
      this.contactUser = [{
        name: 'User'
      }];
      this.dataList = [{
        class : 'col-md-6',
        class1: 'col-md-6',
        class5: 'col-md-2',

        type: '1',
        class2: 'col-md-6',
        class3: 'col-md-10',
        class4: 'plustbutton'
         }
    ];

    }

    this.onClose = new Subject();

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
        linear: false,
        animation: true
      });
  }
  next() {
    this.stepper.next();
  }
  onSubmit() {
    return false;
  }
  submitData() {
    this.data.metadata = {};
    if (this.dataList.length > 0 ) {
  // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.dataList.length ; i++) {
      if (this.dataList[i].name) {
         this.data.metadata[this.dataList[i].name] = this.dataList[i].value;
       }
    }
    // this.data.parentAccount
    this.data.createdBy = 'admin';
    this.data.accountId = 'Radius-PF';
    this.data.status = 'ACTIVE';
  }
  if(this.data.parentAccount == '1'){
    this.data.parentAccount = "";
  }
    this.data.userContacts = this.contactUser;
    console.log(JSON.stringify(this.data));
    this.Service.addAccount(this.data).subscribe(res => {
      this._bsModalRef.hide();
      this.onClose.next(true);
      this.Service.suceesAlertDialog('Account Successfully Created');
    });
  }
}
