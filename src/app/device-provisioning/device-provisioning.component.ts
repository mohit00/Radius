import { Component, OnInit, SecurityContext  } from '@angular/core';
import {DeviceProvisioningDialogComponent} from './device-provisioning-dialog/device-provisioning-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from '../auth.service';
import { DatePipe } from '@angular/common';
declare interface TableData {
  headerRow: any ;
  dataRows: string[][];
}
@Component({
  selector: 'app-device-provisioning',
  templateUrl: '../table/table.html',
  styleUrls: ['../table/table.scss']
})
export class DeviceProvisioningComponent implements OnInit {
constructor(private modalService: BsModalService, private service: AuthService) {
  this.pageCountArray = [];
  this.selectedPage = 1;
  this.page = 0;
  this.size = this.service.sizetable;
  this.sort = 0;

  this.header = [{
    name: 'Things ID',
    width: 10
  }, {
    name: 'Things NAME',
    width: 10
  }, {
    name: 'Things DESCRIPTION',
    width: 10
  },  {
    name: 'Things Type',
    width: 10
  },   {
    name: 'DATE',
    width: 10
  },
  {
    name: 'ACTION',
    width: 10
  }
 ];

  this.keyData = ['tenantId', 'name', 'description', 'deviceType',  'lastUpdatedOn', 'action'];
 }
  page: any;
   pageCountArray: any;
   last: any;
size: any;
sort: any;
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

nextDisabled: any;
preDisabled: any;
    selectedPage: any;
    showpagi = true;
    advanceSearch = false;
pageInfo: any;
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
              if (data[key] === true) {
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
  this.service.getthingList(this.page, this.size, this.sort).subscribe(res => {
    this.pageInfo = res.page;

    this.showpagi = true;
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
    this.displayList = res._embedded.things;
    this.pageCountArray = [];
    for (let i = 0 ; i < this.pageCount; i++) {
      this.pageCountArray.push(i + 1);
    }
  });
}
ngOnInit() {
  this.title = 'Add Things';
  this.getEventList();
    }
    detail(data) {
      this.service.setId(data._links.self.href , 'Device/Provisioning/Detail');
    }
    edit(data ) {
      this.service.setId(data._links.self.href   , 'Device/Provisioning');
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
    delete(data: any ) {
      alert('ds');
    }
    prePage() {

      this.selectedPage = this.selectedPage - 1;
      this.page = this.selectedPage - 1 ;
      this.getEventList();
  }
  Page(data) {
     this.selectedPage = data ;
     this.page = this.selectedPage - 1;
     this.getEventList();
  }
    nextPage() {
        this.selectedPage = this.selectedPage + 1;
        this.page = this.selectedPage - 1;
        this.getEventList();
    }
    getClass(data) {
      if (this.selectedPage === data) {
        return 'active';
      } else {
        return '';
      }
    }
// tslint:disable-next-line: ban-types
    searchresult(name: String, description: String) {
      this.service.getSearchThings(name , description).subscribe(res => {
    this.displayList = res;
    this.showpagi = false;
       });
    }
// tslint:disable-next-line: ban-types
    onSearchChange(searchValue: string , serchdescription: String) {
      if (searchValue || serchdescription) {
        console.log(searchValue);
        this.searchresult(searchValue, serchdescription);
      } else {
        this.getEventList();
        this.showpagi = true;

      }
    }
    toggelSearch() {
      this.advanceSearch = !this.advanceSearch;
      if (this.advanceSearch) {

      } else {

      ( document.getElementById('searchName') as HTMLInputElement).value = '';
      ( document.getElementById('searchDescription') as HTMLInputElement).value = '';
      ( document.getElementById('search') as HTMLInputElement).value = '';

      this.getEventList();
      this.showpagi = true;

      }
    }
}
