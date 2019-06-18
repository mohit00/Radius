import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from '../../auth.service';
import {WebserModel} from '../../Service.model';
@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss']
})
export class DeviceDialogComponent implements OnInit {
  apage: any;

  asize: any;
  asort: any;
  aselectedList: any;
  apageCountArray: any;
  aselectedPage: any;
  anextDisabled: any;
 apreDisabled: any;
 apageCount: any;

  epage: any;
  esize: any;
  esort: any;
  eselectedList: any;
  epageCountArray: any;
  eselectedPage: any;
  enextDisabled: any;
 epreDisabled: any;
 epageCount: any;
  cpage: any;
  csize: any;
  csort: any;
  cselectedList: any;
  cpageCountArray: any;
  cselectedPage: any;
  cnextDisabled: any;
 cpreDisabled: any;
 cpageCount: any;
  constructor(private _bsModalRef: BsModalRef,
              private AuthService: AuthService, private WebserModel: WebserModel ) {
    this.apage = 0;
    this.asize = 5;
    this.asort = 0;
    this.data = {};
    this.aselectedPage = 1;

    this.epage = 0;
    this.esize = 5;
    this.esort = 0;
    this.eselectedPage = 1;

    this.cpage = 0;

    this.csize = 5;
    this.csort = 0;
    this.cselectedPage = 1;
    this.dataList = [{
    class : 'col-md-4',
    class1: 'col-md-4',
    class2: 'col-md-4',
    class3: 'col-md-10',
    class4: 'plustbutton'
   }
  ];
    this.eventselectedList = [];
    this.attributeselectedList = [];
    this.commandselectedList = [];

    // attributeselectedList: any;
    // commandselectedList: any;
    this.data = {templateType: 'nonCommunicable', eventTemplate: [], commandTemplate: [], attributeTemplate: []};
  }
  public onClose: Subject<boolean>;
  public onCloseEdit: Subject<boolean>;

  data: any;
  dataList: any;
  eventselectedList: any;
  attributeselectedList: any;
  commandselectedList: any;

  eventDetailList: any;
  attrDetailList: any;
  commandDetailList: any;
  title: any;
  id: any;
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
    this.data.isFreeze = false;
    // eventselectedList: any;
    // attributeselectedList: any;
    // commandselectedList: any;

    if (this.data.templateType === 'Communicable') {
      if (this.eventselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
        for (let i = 0 ; i < this.eventselectedList.length ; i ++) {
          this.data.eventTemplate.push(this.eventselectedList[i]._links.self.href );
         }
      }
      if (this.attributeselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
for (let i = 0 ; i < this.attributeselectedList.length ; i ++) {
  this.data.attributeTemplate.push(this.attributeselectedList[i]._links.self.href );
 }
      }
      if (this.commandselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
for (let i = 0 ; i < this.commandselectedList.length ; i ++) {
  this.data.commandTemplate.push(this.commandselectedList[i]._links.self.href );
 }
      }
    }
    this.data.tenantId = 'radius-PF';
    console.log(JSON.stringify(this.data));
    this.AuthService.adddeviceTemplate(this.data).subscribe(res => {
      this.onClose.next(true);

      this._bsModalRef.hide();
      this.AuthService.suceesAlertDialog('Things Template has been successfully Created.' );

      });

  }
  submitUpdate() {
  
    this.data.isFreeze = false;
    // eventselectedList: any;
    // attributeselectedList: any;
    // commandselectedList: any;

    if (this.data.templateType === 'Communicable') {
      if (this.eventselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
        for (let i = 0 ; i < this.eventselectedList.length ; i ++) {
          this.data.eventTemplate.push(this.eventselectedList[i]._links.self.href );
         }
      }
      if (this.attributeselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
for (let i = 0 ; i < this.attributeselectedList.length ; i ++) {
  this.data.attributeTemplate.push(this.attributeselectedList[i]._links.self.href );
 }
      }
      if (this.commandselectedList.length > 0) {
// tslint:disable-next-line: prefer-for-of
for (let i = 0 ; i < this.commandselectedList.length ; i ++) {
  this.data.commandTemplate.push(this.commandselectedList[i]._links.self.href );
 }
      }
    }
     
    this.data.tenantId = 'radius-PF';
    this.AuthService.updatedeviceTemplate(this.data, this.WebserModel.Sevice.BASE_URL + 'thingTemplates/' + this.id).subscribe(res => {
      this.onCloseEdit.next(true);

      this._bsModalRef.hide();
      this.AuthService.suceesAlertDialog('Things Template has been successfully Updated.' );

      });

  }
  geteventList() {
    this.AuthService.getEventTemplate(this.epage, this.esize, this.esort).subscribe(res => {
       this.eventDetailList = res._embedded.eventTemplates;

       this.epageCount =  res.page.totalPages;
       if (this.epageCount === this.epage + 1) {
      this.enextDisabled = true;
    } else {
      this.enextDisabled = false;
    }
       if (this.epage   === 0) {
      this.epreDisabled = true;
    } else {
      this.epreDisabled = false;
    }
       this.epageCountArray = [];
       for (let i = 0 ; i < this.cpageCount; i++) {
      this.epageCountArray.push(i + 1);
    }
       if (this.eventselectedList.length > 0) {
         // tslint:disable-next-line: prefer-for-of
         for (let i = 0 ; i < this.eventselectedList.length ; i ++) {
        const indexselected =   this.eventDetailList.findIndex(
           record => record._links.self.href === this.eventselectedList[i]._links.self.href );
        if (indexselected == -1) {} else {
            this.eventDetailList[indexselected].check = true;

           }
      }

     }
    });
  }

  getattriList() {
    this.AuthService.getAttributeTemplate(this.apage, this.asize, this.asort).subscribe(res => {
      this.attrDetailList = res._embedded.attributeTemplates;

      this.apageCount =  res.page.totalPages;

      if (this.apageCount === this.apage + 1) {
      this.anextDisabled = true;
    } else {
      this.anextDisabled = false;

    }

      if (this.apage   === 0) {
      this.apreDisabled = true;
    } else {
      this.apreDisabled = false;

    }
      this.apageCountArray = [];
      for (let i = 0 ; i < this.apageCount; i++) {
      this.apageCountArray.push(i + 1);
    }
      if (this.attributeselectedList.length > 0) {
       const indexselected =   this.attrDetailList.findIndex(
          record => record._links.self.href === this.attributeselectedList[0]._links.self.href
           );
       this.attrDetailList[indexselected].check = true;
     }
    });
  }
  getcommandList() {
    this.AuthService.getComandTemplate(this.cpage, this.csize, this.csort).subscribe(res => {
       this.commandDetailList = res._embedded.commandTemplates;

       this.cpageCount =  res.page.totalPages;

       if (this.cpageCount === this.cpage + 1) {
      this.cnextDisabled = true;
    } else {
      this.cnextDisabled = false;

    }

       if (this.cpage   === 0) {
      this.cpreDisabled = true;
    } else {
      this.cpreDisabled = false;

    }
       this.cpageCountArray = [];
       for (let i = 0 ; i < this.cpageCount; i++) {
      this.cpageCountArray.push(i + 1);
    }

       if (this.commandselectedList.length > 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0 ; i < this.commandselectedList.length ; i ++) {
     const indexselected =   this.commandDetailList.findIndex(
        record => record._links.self.href === this.commandselectedList[i]._links.self.href );
     if (indexselected === -1) {} else {
         this.commandDetailList[indexselected].check = true;

        }
   }

  }

    });
  }
  eventselectedListdata(data) {
    data.check = ! data.check;
    if (data.check) {
      this.eventselectedList.push(data);
    } else {
    const index =   this.eventselectedList.findIndex( record => record._links.self.href === data._links.self.href );

    this.eventselectedList.splice(index, 1);
  }
  }
  attributeselectedListdata(data: { _links: { self: { href: any; }; }; check: boolean; }) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.attrDetailList.length; i++) {
      if (this.attrDetailList[i]._links.self.href != data._links.self.href) {
        this.attrDetailList[i].check =  false;
        }
       }
    data.check = ! data.check;

    this.attributeselectedList = [];

    if (data.check) {
      this.attributeselectedList.push(data);
    } else {
    const index =   this.attributeselectedList.findIndex( record => record._links.self.href === data._links.self.href );
    this.attributeselectedList.splice(index, 1);
  }
  //   data.check = ! data.check;
  //   if (data.check) {
  //     this. attributeselectedList.push(data);
  //   } else {
  //   const index =   this. attributeselectedList.findIndex( record => record._links.self.href === data._links.self.href );
  //   this. attributeselectedList.splice(index, 1);
  // }
  }
  commandselectedListdata(data) {
    data.check = ! data.check;

    if (data.check) {
      this. commandselectedList.push(data);
    } else {
    const index =   this. commandselectedList.findIndex( record => record._links.self.href === data._links.self.href );
    this. commandselectedList.splice(index, 1);
  }
  }
  remove(index) {
    this.dataList.splice(index, 1);
  }
  deviceDetail() {
    this.eventselectedList = [];
    this.commandselectedList = [];
    this.attributeselectedList = [];
    this.AuthService.getDetail(this.WebserModel.Sevice.BASE_URL + 'thing-service/thingTemplates/' + this.id).subscribe(res => {
      this.getattriList();
      this.getcommandList();
      this.geteventList();
      this.data = res;
      if (res.eventTemplate) {
// tslint:disable-next-line: prefer-for-of
       for (let i = 0 ; i < res.eventTemplate.length; i++) {
        this.eventselectedList.push({
          _links: {
            self: {
              href: this.WebserModel.Sevice.BASE_URL + 'eventTemplates/' + res.eventTemplate[i].id
            }
          }
        });
       }

     }
      if (res.commandTemplate) {
      // tslint:disable-next-line: prefer-for-of
             for (let i = 0 ; i < res.commandTemplate.length; i++) {
              this.commandselectedList.push({
                _links: {
                  self: {
                    href: this.WebserModel.Sevice.BASE_URL + 'commandTemplates/' + res.commandTemplate[i].id
                  }
                }
              });
             }
           }
      if (res.attributeTemplate) {
      this.attributeselectedList.push({
        _links: {
          self: {
            href: this.WebserModel.Sevice.BASE_URL + 'attributeTemplates/' + res.attributeTemplate[0].id
          }
        }
      });
           }
      if (this.commandselectedList.length > 0 ) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0 ; i < this.commandselectedList.length ; i ++) {
           const indexselected =   this.commandDetailList.findIndex(
              record => record._links.self.href === this.commandselectedList[i]._links.self.href );
           if (indexselected === -1) {} else {
               this.commandDetailList[indexselected].check = true;

              }
         }

        }
      if (this.eventselectedList.length > 0 ) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0 ; i < this.eventselectedList.length ; i ++) {
     const indexselected =   this.eventDetailList.findIndex(
        record => record._links.self.href === this.eventselectedList[i]._links.self.href );
     if (indexselected == -1) {} else {
         this.eventDetailList[indexselected].check = true;
        }
   }
  }

      if (this.attributeselectedList.length > 0) {
    const indexselected =   this.attrDetailList.findIndex(
       record => record._links.self.href === this.attributeselectedList[0]._links.self.href
        );
    this.attrDetailList[indexselected].check = true;
  }

    });
  }
  public ngOnInit(): void {
      this.onClose = new Subject();
      this.onCloseEdit = new Subject();

      if (this.title === 'false') {
        this.getattriList();
        this.getcommandList();
        this.geteventList();
      } else {
        this.deviceDetail();
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
  aprePage() {

    this.aselectedPage = this.aselectedPage - 1;
    this.apage = this.aselectedPage - 1 ;
    this.getattriList();


}
aPage(data) {
   this.aselectedPage = data ;
   this.apage = this.aselectedPage - 1;
   this.getattriList();
}
  anextPage() {

      this.aselectedPage = this.aselectedPage + 1;
      this.apage = this.aselectedPage - 1;
      this.getattriList();

  }
  agetClass(data) {
    if (this.aselectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }

  eprePage() {

    this.eselectedPage = this.eselectedPage - 1;
    this.epage = this.eselectedPage - 1 ;
    this.geteventList();


}
ePage(data) {
   this.eselectedPage = data ;
   this.epage = this.eselectedPage - 1;
   this.geteventList();
}
  enextPage() {

      this.eselectedPage = this.eselectedPage + 1;
      this.epage = this.eselectedPage - 1;
      this.geteventList();

  }
  egetClass(data) {
    if (this.eselectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }


  cprePage() {

    this.cselectedPage = this.cselectedPage - 1;
    this.cpage = this.cselectedPage - 1 ;
    this.getcommandList();


}
cPage(data) {
   this.cselectedPage = data ;
   this.cpage = this.cselectedPage - 1;
   this.getcommandList();
}
  cnextPage() {

      this.cselectedPage = this.cselectedPage + 1;
      this.cpage = this.cselectedPage - 1;
      this.getcommandList();

  }
  cgetClass(data) {
    if (this.cselectedPage === data) {
      return 'active';
    } else {
      return '';
    }
  }
}
