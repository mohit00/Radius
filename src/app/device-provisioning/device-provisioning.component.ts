import { Component, OnInit,SecurityContext  } from '@angular/core';
import {DeviceProvisioningDialogComponent} from './device-provisioning-dialog/device-provisioning-dialog.component'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from '../auth.service';
import { DatePipe } from '@angular/common';

declare interface TableData {
  headerRow:  any ;
  dataRows: string[][];
}
 
@Component({
  selector: 'app-device-provisioning',
  templateUrl: '../table/table.html',
  styleUrls: ['../table/table.scss']
})
export class DeviceProvisioningComponent implements OnInit {
  public tableData1: TableData;
  pipe = new DatePipe('en-US');
  bsModalRef: BsModalRef;
  pageCount: any;
  displayList: any;
// tslint:disable-next-line: ban-types
  title: String;
rowSpan: number;
header: any;
keyData: any;
actionData: any;
pageCountArray:any;
constructor(private modalService: BsModalService, private service: AuthService) {
  this.pageCountArray = [];

  this.header = [{
    name: 'TEMPLATE ID',
    width: 10
  }, {
    name: 'TEMPLATE NAME',
    width: 10
  }, {
    name: 'TEMPLATE DESCRIPTION',
    width: 10
  }, {
    name: 'IS FREEZE',
    width: 10
  }, {
    name: 'DATE',
    width: 10
  },
  {
    name: 'ACTION',
    width: 10
  }
 ];

  this.keyData = ['tenantId', 'name', 'description', 'freeze', 'lastUpdatedOn', 'action'];
 }
open() {
    const initialState = {
      title: 'false',
    };
    this.bsModalRef = this.modalService.show(DeviceProvisioningDialogComponent,  {initialState, class: 'gray modal-lg' });

    this.bsModalRef.content.onClose.subscribe(result => {
     this.getEventList();
     console.log('results', result);
});

}

getData(data, key , index) {
  if (key) {
    if (key === 'freeze') {
       if (data[key] === true) {
        return '<i class="fa fa-check-square" aria-hidden="true"></i>';

      } else {
        return '<i class="fa fa-window-close" aria-hidden="true"></i>';
      }
    } else {

    }
    if (key === 'action') {
      this.actionData =  `
      <i class="fa fa-eye" aria-hidden="true"  (click) ="eventedit()"></i>
      <i class="fa fa-pencil" aria-hidden="true"></i>
      <i class="fa fa-trash" aria-hidden="true"></i>

      `;
      return this.actionData;
    } else {}
    if (data[key]) {
 // tslint:disable-next-line: triple-equals
      if ( isNaN(new Date(data[key]).getTime()  ) ) {
       return data[key];
     } else {

        if (Number.isInteger((data[key]))) {
          return data[key];
          } else {
            if (typeof data[key] === 'string' || data[key] instanceof String) {
              if ( typeof data[key].substring( 0 , 1)  === 'string' || data[key] instanceof String ) {
// tslint:disable-next-line: radix
                if (Number.isInteger(parseInt(data[key].substring( 0 , 1)) )) {
                  try {
                   JSON.parse(data[key]);
                   return data[key];
                   } catch (err) {
                      // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                        return this.pipe.transform(data[key], 'MM/dd/yyyy HH:MM:SS');
                   }


                } else {
                  return data[key];
                }


              } else if
              (data[key].substring( 0 , 3 ) === 'ERN'
              || data[key].substring( 0 , 3 ) === 'MRN'
              || data[key].substring( 0 , 3 ) === 'SSC'
              || data[key].substring( 0 , 3 ) === 'Pro'
              || data[key].substring( 0 , 3 ) === 'Opp'
              || data[key].substring( 0 , 3 ) === 'Equ'
              || data[key].substring( 0 , 1 ) === 'C'
              || data[key].substring( 0 , 1 ) === 'P') {
                 return data[key];
              } else {
                  // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                  return this.pipe.transform(data[key], 'MM/dd/yyyy HH:MM:SS');

              }
            } else {
              if (data[key] == true) {
                   return 'YES';
                 } else {

                // var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
                return this.pipe.transform(data[key], 'MM/dd/yyyy HH:MM:SS');
              }


            }

          }
     }

        } else {
          return '';
        }
    // this.pipe.transform(data[key], 'short');
    return data[key];

  } else {
    return '';
  }
}
getEventList() {
  this.service.getthingList().subscribe(res => {
  this.displayList = res._embedded.things;
  });
}
ngOnInit() {
  this.title = 'Add Attribute';
  this.getEventList();
    }
    detail(data) {
      this.service.setId(data._links.self.href , 'Attribute/Template/detail');
    }
    edit(data) {

      this.service.setId(data._links.self.href   , 'Attribute/Template');
      const initialState = {
        title: 'true',
        id: this.service.getId
      };
      this.bsModalRef = this.modalService.show(DeviceProvisioningDialogComponent,  {initialState, class: 'gray modal-lg' });

      this.bsModalRef.content.onCloseEdit.subscribe(result => {
        this.getEventList();
        console.log('results', result);
   });

    }
    delete(data) {
      alert('ds');
    }


}
